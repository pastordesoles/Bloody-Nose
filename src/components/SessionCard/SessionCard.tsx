import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import AlarmRoundedIcon from "@mui/icons-material/AlarmRounded";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import SportsKabaddiRoundedIcon from "@mui/icons-material/SportsKabaddiRounded";
import GradeRoundedIcon from "@mui/icons-material/GradeRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import MessageRoundedIcon from "@mui/icons-material/MessageRounded";
import SportsMartialArtsRoundedIcon from "@mui/icons-material/SportsMartialArtsRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Session } from "../../redux/features/sessionsSlice/types";
import { Link, useNavigate } from "react-router-dom";
import SessionCardStyled from "./SessionCardStyled";
import { useAppSelector } from "../../redux/hooks";
import useSessions from "../../hooks/useSessions/useSessions";

interface SessionCardProps {
  session: Session;
  isDetail: boolean;
}

const SessionCard = ({
  session: {
    date,
    length,
    style,
    title,
    picture,
    supabasePicture,
    id,
    content,
    level,
    location,
    material,
    participants,
    owner,
  },
  isDetail,
}: SessionCardProps): JSX.Element => {
  const userId = useAppSelector(({ user }) => user.id);
  const { deleteOneSession } = useSessions();
  const navigate = useNavigate();

  return (
    <Card sx={{ width: "90%", heigth: "100%" }}>
      <CardMedia
        component="img"
        alt={title}
        height="250"
        src={picture as string}
      />
      <CardContent>
        <SessionCardStyled
          gutterBottom
          variant="h5"
          display="flex"
          justifyContent="center"
        >
          <Link to={`/session/${id}`} className="link">
            {title}
          </Link>
        </SessionCardStyled>
        {isDetail && (
          <>
            <Stack
              direction="column"
              spacing={1}
              justifyContent="space-between"
              alignItems="center"
              paddingBottom={1}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                display={"flex"}
                alignItems={"flex-end"}
                sx={{ gap: 1 }}
              >
                <LocationOnRoundedIcon /> {location}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                display={"flex"}
                alignItems={"flex-end"}
                sx={{ gap: 1 }}
              >
                <GradeRoundedIcon /> {level}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                display={"flex"}
                alignItems={"flex-end"}
                sx={{ gap: 1 }}
              >
                <GroupRoundedIcon />
                {participants}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                display={"flex"}
                alignItems={"flex-end"}
                sx={{ gap: 1 }}
              >
                <FormatListBulletedRoundedIcon /> {material}
              </Typography>
            </Stack>
          </>
        )}

        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          paddingBottom={1}
        >
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
        {isDetail && (
          <Typography
            variant="body2"
            color="text.secondary"
            display={"flex"}
            alignItems={"flex-end"}
            sx={{ gap: 1 }}
            textOverflow={"clip"}
          >
            <MessageRoundedIcon /> {content}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Stack direction="row" spacing={1} justifyContent="center" width="100%">
          <Button size="medium">
            {" "}
            <SportsMartialArtsRoundedIcon /> Join!
          </Button>

          {owner === userId && (
            <Button
              size="small"
              onClick={() => deleteOneSession(id!)}
              aria-label="delete"
            >
              <DeleteIcon />
            </Button>
          )}
          {owner === userId && isDetail && (
            <Button
              size="small"
              onClick={() => navigate(`/edit/${id}`)}
              aria-label="edit"
            >
              <BorderColorRoundedIcon />
            </Button>
          )}
        </Stack>
      </CardActions>
    </Card>
  );
};

export default SessionCard;
