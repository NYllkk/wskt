import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { FaRegSmile } from "react-icons/fa";
import SendIcon from "@mui/icons-material/Send";
import { useSelector } from "react-redux";
const url = "http://localhost:2000";
const Centre = () => {
  const [id, setid] = useState("");
  const [show, setShow] = useState([]);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const user = useSelector((state) => state.auth?.user?.user?.email);
  const handleEmojiSelect = (emoji) => {
    setSelectedEmoji(emoji);
    // setIsEmojiPickerOpen(false);
  };
  const handleToggleEmojiPicker = () => {
    setIsEmojiPickerOpen((prev) => !prev);
  };
  console.log(selectedEmoji, "in here with selected emoji");
  const sendChat = () => {
    const userInput = document.getElementById("userInput").value;
    console.log(userInput, "here in userInputValue ");
    if (socket) {
      socket.emit("message", { userInput, id });
    }
    document.getElementById("userInput").value = "";
    setShow((prevShow) => [...prevShow, userInput]);
    console.log(show, "in here with the final user message ");
  };
  useEffect(() => {
    const socket = io(url, { transports: ["websocket"] });
    socket.on("connect", () => {
      console.log("connected");
      setid(socket.id);
      console.log(socket.id, "socket gets consoled ");
    });
    setSocket(socket);
    socket.emit("joined", { user });
    socket.on("welcome", (data) => {
      setMessages((msg) => [...msg, data]);
      console.log("here in message with data object", data);
      console.log(data.user, data.message, data.online);
    });
    socket.on("userJoined", (data) => {
      setMessages((msg) => [...msg, data]);
      console.log(data.user, data.message);
    });
    socket.on("leave", (data) => {
      setMessages((msg) => [...msg, data]);
      console.log(data.user, data.message);
    });
    socket.on("sendMessage", (data) => {
      console.log(data, "in send message ");
      setMessages((msg) => [...msg, data]);
      console.log(
        "Received message:",
        data.message,
        "from user:",
        data.user,
        "with id:",
        data.id
      );
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "centre",
          alignItems: "centre",
          height: "82vh",
          backgroundColor: "#f4f4f4",
          width: "100%",
          color: "white",
        }}
      >
        <Box
          sx={{
            overflowY: "auto",
            padding: "20px",
            width: "100%",
          }}
        >
          {messages.map((message, index) => {
            return (
              <p
                style={{
                  backgroundColor: "rgb(209 245 209)",
                  color: "black",
                  padding: "8px",
                  borderRadius: "8px",
                  margin: "4px 0",
                }}
                key={index}
              >
                {message.user}: {message.message}
              </p>
            );
          })}
        </Box>
      </Box>
      <Box
        sx={{
          borderRadius: "12px",
          borderColor: "black",
          borderStyle: "",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
        }}
      >
        {selectedEmoji && (
          <img
            src={selectedEmoji.imageUrl}
            alt={selectedEmoji.emoji}
            style={{ width: "30px", height: "30px", borderRadius: "50%" }}
          />
        )}
        <TextField
          variant="outlined"
          id="userInput"
          sx={{
            width: "100%",
            borderRadius: "24px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "black",
                borderRadius: "70px",
              },
            },
            "& input": {
              padding: "12px",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <FaRegSmile
                    onClick={handleToggleEmojiPicker}
                    style={{ cursor: "pointer" }}
                  />
                </Box>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <SendIcon
                  onClick={sendChat}
                  sx={{ color: "green", cursor: "pointer" }}
                />
              </InputAdornment>
            ),
          }}
          placeholder="Type a message"
        />
        {isEmojiPickerOpen && (
          <EmojiPicker
            onEmojiClick={handleEmojiSelect}
            disableSearchBar
            disableSkinTonePicker
          />
        )}
      </Box>
    </>
  );
};

export default Centre;