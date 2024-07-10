import Box from "@mui/material/Box";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export const TabContent = (props: TabPanelProps) => {
  const { children, value, index } = props;

  return (
    <>
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    </>
  );
};

export default TabContent;
