import { Navigation } from "@/components/Navigation";
import { PageHeader } from "@/components/PageHeader";
import { TokenColumn } from "@/components/TokenColumn";
import { MobileTabNav } from "@/components/MobileTabNav";
import { mockTokens } from "@/lib/mockData";
import { memo, useState } from "react";

/**
 * Main index page component
 * Displays three columns of tokens on desktop, single column with tabs on mobile
 * Features real-time updates, filtering, and sorting capabilities
 * Optimized with React.memo to prevent unnecessary re-renders
 */
const Index = memo(() => {
  const [mobileActiveTab, setMobileActiveTab] = useState<string>("new");

  // Get tokens based on active mobile tab
  const getMobileTokens = () => {
    switch (mobileActiveTab) {
      case "new":
        return mockTokens.newPairs;
      case "final":
        return mockTokens.finalStretch;
      case "migrated":
        return mockTokens.migrated;
      default:
        return mockTokens.newPairs;
    }
  };

  const getMobileTitle = () => {
    switch (mobileActiveTab) {
      case "new":
        return "New Pairs";
      case "final":
        return "Final Stretch";
      case "migrated":
        return "Migrated";
      default:
        return "New Pairs";
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      <Navigation />
      
      {/* Desktop Page Header - hidden on mobile */}
      <div className="hidden lg:block">
        <PageHeader />
      </div>

      {/* Mobile Tab Navigation - hidden on desktop */}
      <div className="lg:hidden">
        <MobileTabNav 
          activeTab={mobileActiveTab} 
          onTabChange={setMobileActiveTab} 
        />
      </div>
      
      <main id="main-content" className="flex-1 min-h-0" tabIndex={-1}>
        {/* Desktop: Three columns */}
        <div className="hidden lg:grid h-full grid-cols-1 lg:grid-cols-3 gap-px bg-border">
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

        {/* Mobile: Single column based on active tab */}
        <div className="lg:hidden h-full bg-background">
          <TokenColumn
            title={getMobileTitle()}
            tokens={getMobileTokens()}
            category={mobileActiveTab as "new" | "final" | "migrated"}
          />
        </div>
      </main>
    </div>
  );
});

export default Index;
