import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import ChipsArray from "./bug-info-card";

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    marginTop: "10px"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

export default function CommentsCard({ comments, assignee }) {
  const classes = useStyles();
  console.log(comments)
  const ListOfCommentCards = comments.map(comment => {
    return (
      <Card className={classes.card} key={comment._id}>
        <CardContent>
          {assignee.username === comment.author && (
            <Chip color="primary" label="Asignee" />
          )}
          <Typography variant="h5" component="h2">
            {comment.author}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {comment.date}
          </Typography>
          <Typography variant="body1" component="p">
            {comment.text}
          </Typography>
          {comment.updateStatus && <ChipsArray info={comment.updateStatus} />}
        </CardContent>
      </Card>
    );
  });

  return <div>{ListOfCommentCards}</div>;
}
