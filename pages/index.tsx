import { EntryList, NewEntry } from "@/components/UI";
import { Layout } from "@/components/layouts";
import { CardContent, Grid, CardHeader, Card } from "@mui/material";




export default function Home() {
  return (
    <Layout>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4} >
       <Card sx={{ height: 'calc(100vh - 100px)', width: '100%' }} >
        <CardHeader title="Pendientes" />
        <CardContent>
          <NewEntry/>
          <EntryList status="pending"/>
        </CardContent> 
       </Card>
      </Grid>
      <Grid item xs={12} sm={4} >
       <Card sx={{ height: 'calc(100vh - 100px)', width: '100%' }} >
        <CardHeader title="En Progreso" />
        <CardContent>
          <EntryList status="in-progress"/>
        </CardContent> 
       </Card>
      </Grid>
      <Grid item xs={12} sm={4} >
       <Card sx={{ height: 'calc(100vh - 100px)', width: '100%' }} >
        <CardHeader title="Completados" />
        <CardContent>
          <EntryList status="finished"/>
        </CardContent>
       </Card>
      </Grid>
    </Grid>

    </Layout>
    
  )
}
