import { Box, Button, TextField } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/AddCircle";
import { useContext, useState } from "react";
import { EntriesContext, UiContext } from "@/context";

export const NewEntry = () => {
  const { isAddingEntry, toggleAdding } = useContext(UiContext);

  const [inputValue, setInputValue] = useState("");
  const [touched, setTouched] = useState(false);
  const { addNewEntry } = useContext(EntriesContext);

  const onSave = () => {
    toggleAdding(false);
    setInputValue("");
    setTouched(false);
    addNewEntry(inputValue);
  };
  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            multiline
            autoFocus
            label="Nueva entrada"
            helperText={inputValue.length <= 0 && touched && "Ingrese un valor"}
            error={inputValue.length === 0 && touched}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={() => setTouched(true)}
          />
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<CancelIcon />}
              onClick={() => toggleAdding(false)}
            >
              Cancelar
            </Button>

            <Button
              variant="outlined"
              color="secondary"
              endIcon={<SaveIcon />}
              onClick={onSave}
            >
              Guardar
            </Button>
          </Box>
        </>
      ) : (
        <Button
          fullWidth
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => toggleAdding(true)}
        >
          Agregar tarea
        </Button>
      )}
    </Box>
  );
};
