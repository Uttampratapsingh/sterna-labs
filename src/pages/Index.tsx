import { Navigation } from "@/components/Navigation";
import { PageHeader } from "@/components/PageHeader";
import { TokenColumn } from "@/components/TokenColumn";
import { mockTokens } from "@/lib/mockData";
import { memo } from "react";

/**
 * Main index page component
 * Displays three columns of tokens: New Pairs, Final Stretch, and Migrated
 * Features real-time updates, filtering, and sorting capabilities
 * Optimized with React.memo to prevent unnecessary re-renders
 */
const Index = memo(() => {
  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      <Navigation />
      <PageHeader />
      
      <main className="flex-1 min-h-0">
        <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-px bg-border">
          <TokenColumn
            title="New Pairs"
            tokens={mockTokens.newPairs}
            category="new"
          />
          <TokenColumn
            title="Final Stretch"
            tokens={mockTokens.finalStretch}
            category="final"
          />
          <TokenColumn
            title="Migrated"
            tokens={mockTokens.migrated}
            category="migrated"
          />
        </div>
      </main>
    </div>
  );
});

export default Index;
