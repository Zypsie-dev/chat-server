import React from "react";
import ReactDOM from "react-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  TextField,
  IconButton,
  Paper,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

interface Message {
  id: number;
  content: string;
  sender: string;
}

const messages: Message[] = [
  { id: 1, content: "Hello!", sender: "Alice" },
  { id: 2, content: "Hi there!", sender: "Bob" },
];

const MessageList: React.FC = () => {
  return (
    <Container>
      {messages.map((message) => (
        <Paper
          key={message.id}
          elevation={3}
          style={{ padding: "10px", marginBottom: "10px" }}>
          <Typography variant="body1">
            {message.sender}: {message.content}
          </Typography>
        </Paper>
      ))}
    </Container>
  );
};

const MessageInput: React.FC = () => {
  return (
    <Container>
      <TextField label="Type your message" fullWidth />
      <IconButton color="primary" aria-label="send">
        <SendIcon />
      </IconButton>
    </Container>
  );
};

const Chat: React.FC = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Messenger</Typography>
        </Toolbar>
      </AppBar>
      <MessageList />
      <MessageInput />
    </div>
  );
};
export default Chat;
