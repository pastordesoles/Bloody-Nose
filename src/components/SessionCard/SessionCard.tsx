import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import AlarmRoundedIcon from "@mui/icons-material/AlarmRounded";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import SportsKabaddiRoundedIcon from "@mui/icons-material/SportsKabaddiRounded";
import SportsMartialArtsRoundedIcon from "@mui/icons-material/SportsMartialArtsRounded";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Session } from "../../redux/features/sessionsSlice/types";

interface SessionCardProps {
  session: Session;
}

const SessionCard = ({
  session: { date, length, style, title, picture, supabasePicture },
}: SessionCardProps): JSX.Element => {
  return (
    <Card sx={{ width: "90%", heigth: "90%" }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={picture}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          display="flex"
          justifyContent="center"
        >
          {title}
        </Typography>
        <Stack direction="row" spacing={1} justifyContent="center">
          <Typography
            variant="body2"
            color="text.secondary"
            display={"flex"}
            alignItems={"flex-end"}
            sx={{ gap: 1 }}
          >
            <SportsKabaddiRoundedIcon />
            {style}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            display={"flex"}
            alignItems={"flex-end"}
            sx={{ gap: 1 }}
          >
            <AlarmRoundedIcon />
            {length}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            display={"flex"}
            alignItems={"flex-end"}
            sx={{ gap: 1 }}
          >
            <EventRoundedIcon />
            {date}
          </Typography>
        </Stack>
      </CardContent>
      <CardActions>
        <Stack direction="row" spacing={1} justifyContent="center" width="100%">
          <Button size="medium">
            {" "}
            <SportsMartialArtsRoundedIcon /> Join!
          </Button>
          <Button size="small">
            <DeleteIcon />
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default SessionCard;
