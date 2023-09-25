import { useEffect, type SyntheticEvent } from "react";

import { TabContext, TabList } from "@mui/lab";

import { Tab } from "@/components/ui/tab";
import { TabPanel } from "@/components/ui/tab-panel";
import { TransactionTab } from "@/components/wallet/transaction-tab";
import { type TransactionQuery } from "@/hooks/api/use-transaction-queries";

export const TransactionMonthTabs = ({
  queries,
  year,
  tab,
  onTabChange,
}: {
  queries?: Record<string, TransactionQuery[]>;
  year?: string;
  tab?: string;
  onTabChange: (tab: string) => void;
}) => {
  useEffect(() => {
    // The tab is set after query data is received,
    // as there is no default value initially and cannot be determined without query data and year
    if (queries && year && !tab)
      onTabChange(`${year}-${queries[year]![0]!.tabViewName}`);
  }, [queries, year, tab, onTabChange]);

  const handleTabChange = (_event: SyntheticEvent, newTab: string) => {
    onTabChange(newTab);
  };

  if (!queries || !year || !tab) return null;

  const availableMonths = queries[year]!;

  return (
    <TabContext value={tab}>
      <div>
        <TabList
          variant="scrollable"
          onChange={handleTabChange}
          sx={{
            "& .MuiTab-root": {
              borderBottom: 3,
              borderBottomStyle: "double",
              borderBottomColor: "pago.300",
              minWidth: "33%",
              maxWidth: 400,
            },
          }}
        >
          {availableMonths.map(({ tabViewName }, idx) => (
            <Tab
              key={idx}
              label={tabViewName}
              value={`${year}-${tabViewName}`}
              sx={{ maxWidth: 400 }}
            />
          ))}
        </TabList>
        {availableMonths.map(({ tabViewName, ...query }, idx) => (
          <TabPanel key={idx} value={`${year}-${tabViewName}`} sx={{ p: 0 }}>
            <TransactionTab query={query} />
          </TabPanel>
        ))}
      </div>
    </TabContext>
  );
};
