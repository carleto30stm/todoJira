import { useContext, useMemo, DragEvent } from "react";
import { List, Paper } from "@mui/material";
import { EntryCard } from "./EntryCard";
import { EntriesStatus } from "@/interfaces";
import { EntriesContext } from "@/context/entries";
import { UiContext } from "@/context";
import styles from "./EntryList.module.css";

interface Props {
  status: EntriesStatus;
}
export const EntryList: React.FC<Props> = ({ status }) => {
  const { entries,  entryUpdate } = useContext(EntriesContext);
  const { isDraggingEntry, draggingEntry } = useContext(UiContext);

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries, status]
  );
  const onDropEntry = (e: DragEvent<HTMLDivElement>) => {
    const id = e.dataTransfer.getData("text");

    const entry = entries.find( entry => entry._id === id)!;
    entry.status = status;
    entryUpdate(entry)
    draggingEntry(false)

  };

  return (
    <div
      onDrop={onDropEntry}
      onDragOver={(e) => e.preventDefault()}
      className={isDraggingEntry ? styles.isdradding : ""}
    >
      <Paper
        sx={{
          height: "calc(100vh - 200px)",
          overflow: "auto",
          backgroundColor: "transparent",
        }}
      >
        <List
          sx={{
            opacity: isDraggingEntry ? 0.2 : 1,
            transition: "all .3s ease-in-out",
          }}
        >
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
