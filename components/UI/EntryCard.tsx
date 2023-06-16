import { DragEvent, useContext } from 'react';
import { useRouter } from 'next/router';
import { dateFuntions } from '@/utilitis';
import { Entry } from "@/interfaces";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import { UiContext } from '@/context';
import styles from './entryCard.module.css'
interface Props {
  entry: Entry
}
export const EntryCard: React.FC<Props> = ({entry}) => {
  const router = useRouter();
  
  const {draggingEntry, isDraggingEntry} = useContext(UiContext)

  const onDragStart = (e:DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text', entry._id);
    e.dataTransfer.dropEffect = 'move'
    draggingEntry(true);
    
  };
  const onDragEnd = (e:DragEvent<HTMLDivElement>) => {
    draggingEntry(false);
  };
  const onClicke = () => {
    
    router.push(`/entries/${entry._id}`)
  };
  

  return (
    <Card 
    onClick={onClicke}
    draggable
    onDragStart={onDragStart}
    onDragEnd={onDragEnd}
    className={isDraggingEntry ? styles.ondrag : ''}
    sx={{ margin: 1 }

    }>
      <CardActionArea>
        <CardContent >
          <Typography sx={{ whiteSpace: "pre-line" }}>
           {entry.description}
          </Typography>
        </CardContent>
        <CardActions sx={{display: 'flex', justifyContent: 'end',paddingRight: 2}}>
          <Typography variant="body2" >{dateFuntions.formatDate(entry.createdAt)}</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
