import { useMemo, useState, FC, useContext } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import {
  capitalize,
  Radio,
  FormControlLabel,
  Card,
  CardHeader,
  Grid,
  CardContent,
  TextField,
  CardActions,
  Button,
  FormControl,
  RadioGroup,
  IconButton,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { Layout } from "../../components/layouts";
import { EntriesStatus, Entry } from "../../interfaces/interface";
import { dbEntry } from "@/dataBase";
import { EntriesContext } from "@/context";

const validStatus: EntriesStatus[] = ["pending", "in-progress", "finished"];
interface Props {
  entry: Entry;
}

const EntryPage: FC<Props> = (props) => {
  const router = useRouter();
  const { entry } = props;
  const {entryUpdate} = useContext(EntriesContext)
  
  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntriesStatus>(entry.status);
  const [tuched, setTuched] = useState(false);
  const isNotValid = useMemo(() => tuched && !inputValue, [inputValue, tuched]);

  const onIputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value as EntriesStatus);
  };
  const onSave = () => {
    if (inputValue.length === 0) return;
    const updatedEntry:Entry = {
      ...entry,
      description: inputValue,
      status,
    }
    entryUpdate(updatedEntry, true)
    router.push("/"); 
   
  };

  return (
    <Layout title={inputValue.substring(0, 20)}>
      <Grid container justifyContent="center" sx={{ mt: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entrada: `}
              subheader={`Creada hace ${entry.createdAt} minutos`}
            />
            <CardContent>
              <TextField
                fullWidth
                placeholder="Ingrese una tarea"
                autoFocus
                multiline
                label="Ingrese una tarea"
                value={inputValue}
                onChange={onIputChange}
                onBlur={() => setTuched(true)}
                helperText={isNotValid && "El campo es obligatorio"}
                error={isNotValid}
              />
              <FormControl>
                <RadioGroup row value={status} onChange={onRadioChange}>
                  {validStatus.map((status) => (
                    <FormControlLabel
                      key={status}
                      value={status}
                      control={<Radio />}
                      label={capitalize(status)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                startIcon={<SaveIcon />}
                fullWidth
                variant="contained"
                onClick={onSave}
                disabled={!inputValue}
              >
                Guarar
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <IconButton
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
          backgroundColor: "error.main",
        }}
      >
        <DeleteIcon />
      </IconButton>
    </Layout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };
  const entry = await dbEntry.getEntryById(id)
  if (!entry) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      }
  }
}

  return {
    props: {
     entry
    },
  };
};

export default EntryPage;
