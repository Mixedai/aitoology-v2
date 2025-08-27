import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { RealtimeChannel, RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import { Tool, Review } from '@/lib/supabase';
import { toast } from 'sonner';

// Hook for real-time tool updates
export function useRealtimeTools(onUpdate?: (tool: Tool) => void) {
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    
    // Subscribe to tool changes
    const toolsChannel = supabase
      .channel('tools-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tools'
        },
        (payload: RealtimePostgresChangesPayload<Tool>) => {
          if (!mounted.current) return;
          
          console.log('Tool change received:', payload);
          
          if (payload.eventType === 'UPDATE' && payload.new) {
            onUpdate?.(payload.new as Tool);
            toast.info(`${payload.new.name} has been updated`);
          }
        }
      )
      .subscribe();

    setChannel(toolsChannel);

    // Cleanup
    return () => {
      mounted.current = false;
      if (toolsChannel) {
        supabase.removeChannel(toolsChannel);
      }
    };
  }, [onUpdate]);

  return channel;
}

// Hook for real-time reviews for a specific tool
export function useRealtimeReviews(
  toolId: string,
  onNewReview?: (review: Review) => void,
  onUpdateReview?: (review: Review) => void,
  onDeleteReview?: (reviewId: string) => void
) {
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);
  const mounted = useRef(true);

  useEffect(() => {
    if (!toolId) return;
    
    mounted.current = true;

    // Subscribe to review changes for this tool
    const reviewsChannel = supabase
      .channel(`reviews-${toolId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'reviews',
          filter: `tool_id=eq.${toolId}`
        },
        (payload: RealtimePostgresChangesPayload<Review>) => {
          if (!mounted.current) return;
          
          console.log('New review received:', payload);
          if (payload.new) {
            onNewReview?.(payload.new as Review);
            toast.success('New review added');
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'reviews',
          filter: `tool_id=eq.${toolId}`
        },
        (payload: RealtimePostgresChangesPayload<Review>) => {
          if (!mounted.current) return;
          
          console.log('Review updated:', payload);
          if (payload.new) {
            onUpdateReview?.(payload.new as Review);
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'reviews',
          filter: `tool_id=eq.${toolId}`
        },
        (payload: RealtimePostgresChangesPayload<Review>) => {
          if (!mounted.current) return;
          
          console.log('Review deleted:', payload);
          if (payload.old) {
            onDeleteReview?.((payload.old as Review).id);
          }
        }
      )
      .subscribe();

    setChannel(reviewsChannel);

    // Cleanup
    return () => {
      mounted.current = false;
      if (reviewsChannel) {
        supabase.removeChannel(reviewsChannel);
      }
    };
  }, [toolId, onNewReview, onUpdateReview, onDeleteReview]);

  return channel;
}

// Hook for real-time stats updates
export function useRealtimeStats(toolId?: string) {
  const [stats, setStats] = useState<any>(null);
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;

    const filter = toolId ? `tool_id=eq.${toolId}` : undefined;
    
    // Subscribe to stats changes
    const statsChannel = supabase
      .channel('stats-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tool_stats',
          ...(filter && { filter })
        },
        (payload: RealtimePostgresChangesPayload<any>) => {
          if (!mounted.current) return;
          
          console.log('Stats change received:', payload);
          
          if (payload.new) {
            setStats(payload.new);
          }
        }
      )
      .subscribe();

    setChannel(statsChannel);

    // Cleanup
    return () => {
      mounted.current = false;
      if (statsChannel) {
        supabase.removeChannel(statsChannel);
      }
    };
  }, [toolId]);

  return { stats, channel };
}

// Hook for presence (who's viewing what)
export function usePresence(channelName: string, userId: string) {
  const [presenceState, setPresenceState] = useState<any>({});
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;

    // Create presence channel
    const presenceChannel = supabase.channel(channelName);
    
    presenceChannel
      .on('presence', { event: 'sync' }, () => {
        if (!mounted.current) return;
        const state = presenceChannel.presenceState();
        setPresenceState(state);
        console.log('Presence sync:', state);
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        if (!mounted.current) return;
        console.log('User joined:', key, newPresences);
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        if (!mounted.current) return;
        console.log('User left:', key, leftPresences);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await presenceChannel.track({
            user_id: userId,
            online_at: new Date().toISOString(),
          });
        }
      });

    setChannel(presenceChannel);

    // Cleanup
    return () => {
      mounted.current = false;
      if (presenceChannel) {
        presenceChannel.untrack();
        supabase.removeChannel(presenceChannel);
      }
    };
  }, [channelName, userId]);

  const updatePresence = async (data: any) => {
    if (channel) {
      await channel.track(data);
    }
  };

  return { presenceState, updatePresence, channel };
}

// Hook for broadcast messages
export function useBroadcast(
  channelName: string,
  onMessage?: (message: any) => void
) {
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;

    // Create broadcast channel
    const broadcastChannel = supabase
      .channel(channelName)
      .on(
        'broadcast',
        { event: 'message' },
        (payload) => {
          if (!mounted.current) return;
          console.log('Broadcast message:', payload);
          onMessage?.(payload);
        }
      )
      .subscribe();

    setChannel(broadcastChannel);

    // Cleanup
    return () => {
      mounted.current = false;
      if (broadcastChannel) {
        supabase.removeChannel(broadcastChannel);
      }
    };
  }, [channelName, onMessage]);

  const sendMessage = async (message: any) => {
    if (channel) {
      await channel.send({
        type: 'broadcast',
        event: 'message',
        payload: message
      });
    }
  };

  return { channel, sendMessage };
}