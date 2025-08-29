import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '../ui/card';

describe('Card Components', () => {
  it('renders card with all sections', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
          <CardDescription>Test Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Test Content</p>
        </CardContent>
        <CardFooter>
          <p>Test Footer</p>
        </CardFooter>
      </Card>
    );
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByText('Test Footer')).toBeInTheDocument();
  });

  it('renders card with proper structure', () => {
    const { container } = render(
      <Card className="test-card">
        <CardHeader className="test-header">
          <CardTitle className="test-title">Title</CardTitle>
        </CardHeader>
      </Card>
    );
    
    const card = container.querySelector('[data-slot="card"]');
    expect(card).toHaveClass('test-card');
    
    const header = container.querySelector('[data-slot="card-header"]');
    expect(header).toHaveClass('test-header');
    
    const title = container.querySelector('[data-slot="card-title"]');
    expect(title).toHaveClass('test-title');
  });

  it('CardTitle renders as h4 by default', () => {
    render(<CardTitle>Test Title</CardTitle>);
    
    const heading = screen.getByRole('heading', { level: 4 });
    expect(heading).toHaveTextContent('Test Title');
  });

  it('CardDescription renders with proper styling', () => {
    const { container } = render(
      <CardDescription>Test Description</CardDescription>
    );
    
    const description = container.querySelector('[data-slot="card-description"]');
    expect(description).toHaveClass('text-muted-foreground');
  });

  it('CardFooter has flex layout', () => {
    const { container } = render(
      <CardFooter>Footer Content</CardFooter>
    );
    
    const footer = container.querySelector('[data-slot="card-footer"]');
    expect(footer).toHaveClass('flex');
  });
});