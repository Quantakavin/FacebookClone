import React, { useState, useEffect } from "react";
import axios from "axios";
import TopBar from "../Components/TopBar";
import {
  Image,
  Spinner,
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Card,
  Modal,
} from "react-bootstrap";
import "../Styles/home.scss";
import "../Styles/privacyswitch.css";
import profilephoto from "../Images/profilephoto.png";
import { useHistory } from "react-router-dom";
import Post from "../Components/Post";
import config from "../config/config";
import Switch from "@mui/material/Switch";
import { motion } from "framer-motion";
import PostSkeleton from "../skeletons/PostSkeleton";
import UserSkeleton from "../skeletons/UserSkeleton";

const Profile = ({ match }) => {
  //const [postid,setPostid] = useState(0);
  const history = useHistory();
  const [friendship, setFriendship] = useState([]);
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState([]);
  const [PageProfile, setPageProfile] = useState([]);
  const [Privacy, setPrivacy] = useState(false);
  const [borderColor, setBorderColor] = useState("transparent");
  const [errorMsg, setErrorMsg] = useState("");
  const [alertContent, setAlertContent] = useState("");
  const [rerender, setRerender] = useState(false);
  const [users, setUsers] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const [mutualfriends, setMutualfriends] = useState([]);
  const [mutualfriendsLoading, setMutualfriendsLoading] = useState(true);
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const [checked, setChecked] = React.useState(false);
  const [ifFriends, setIfFriends] = useState();
  const [showFriendList, setShowFriendList] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeed();
    getUsersProfile();
    getPageProfile();
    getTotalFriends();
    getFriendship();
    getMutualFriends();
    setRerender(false);
  }, [rerender]);
  const [Input, setInput] = useState({
    name: "",
    bio: "",
  });

  const getFeed = () => {
    axios
      .get(`${config.baseURL}/posts/${match.params.id}`)
      .then((response) => {
        console.log(response.data);
        setPosts(response.data);
        setPostsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setPostsLoading(false);
      });
  };

  const getFriendship = () => {
    axios
      .get(
        `${config.baseURL}/friendship?userid=${localStorage.getItem(
          "user_id"
        )}&friendid=${match.params.id}`,
        {}
      )
      .then((response) => {
        console.log("friend");
        console.log(response.data);
        setFriendship(response.data);
        setIfFriends(response.data);
        setLoading(false);
        console.log(setIfFriends);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const getMutualFriends = () => {
    axios
      .get(
        `${config.baseURL}/getMutualFriends?user_id=${localStorage.getItem(
          "user_id"
        )}&friend_id=${match.params.id}`,
        {}
      )
      .then((response) => {
        console.log(response.data);
        setMutualfriends(response.data);
        setMutualfriendsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setMutualfriendsLoading(false);
      });
  };

  const getTotalFriends = () => {
    axios
      .get(`${config.baseURL}/getFriendList/${match.params.id}`, {})
      .then((response) => {
        console.log("hello" + response.data);
        setFriendList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUsersProfile = () => {
    axios
      .get(`${config.baseURL}/UserData/${localStorage.getItem("user_id")}`)
      .then((response) => {
        console.log("you are user " + localStorage.getItem("user_id"));
        console.log(response.data);
        setUserProfile(response.data);
        if (localStorage.getItem("user_id") == match.params.id) {
          setInput({ name: response.data.name, bio: response.data.bio });
        }
      })
      .catch((error) => {
        console.log("error in frontend");
        console.log(error);
      });
  };

  const PrivacyFalse = () => {
    axios
      .put(`${config.baseURL}/privacyFalse/?${localStorage.getItem("user_id")}`)
      .then((response) => {
        console.log(response.data);
        setPrivacy = false;
      })
      .catch((error) => {
        console.log("error in frontend");
        console.log(error);
      });
  };

  const PrivacyTrue = () => {
    axios
      .put(`${config.baseURL}/privacyTrue/?${localStorage.getItem("user_id")}`)
      .then((response) => {
        console.log(response.data);
        setPrivacy = true;
      })
      .catch((error) => {
        console.log("error in frontend");
        console.log(error);
      });
  };

  const handlePrivacyChange = (event) => {
    let modifyUserProfile = userProfile;
    setChecked(event.target.checked);
    if (event.target.checked == true) {
      axios
        .put(
          `${config.baseURL}/privacy?userid=${userProfile.id}`,
          { privacy: true },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          setRerender(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .put(
          `${config.baseURL}/privacy?userid=${userProfile.id}`,
          { privacy: false },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          setRerender(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setUserProfile(modifyUserProfile);
  };

  const getPageProfile = () => {
    axios
      .get(`${config.baseURL}/UserData/${match.params.id}`)
      .then((response) => {
        console.log("you are viewing profile of user " + match.params.id);
        console.log(response);
        setPageProfile(response.data);
      })
      .catch((error) => {
        console.log("error in frontend");
        console.log(error);
      });
  };

  const handleChange = (event) => {
    setInput({
      ...Input,
      [event.target.name]: event.target.value,
    });
    setChecked(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(
        `${config.baseURL}/User`,
        {
          newName: event.target.name.value,
          newBio: event.target.bio.value,
          userid: localStorage.getItem("user_id"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setRerender((rerender) => !rerender);
        //history.push(`/profile/${localStorage.getItem("user_id")}`)
      })
      .catch((error) => {
        setAlertContent(error.response.data.message);
      });
  };

  // const onChangePrivacy = (event) =>{
  //     event.preventDefault();

  // }

  const [ImageFormLoading, setImageFormLoading] = useState(false);
  const [ImageInput, setImageInput] = useState({
    file: "",
  });
  const handleImageUploadChange = (event) => {
    let files = event.target.files;
    setImageInput({
      ...ImageInput,
      file: files[0],
    });
  };

  const createImagePost = (event) => {
    setImageFormLoading(true);
    let webFormData = new FormData();
    webFormData.append("file", ImageInput.file);
    axios
      .put(`${config.baseURL}/PFP`, webFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setImageFormLoading(false);
        console.log(response);
        setRerender((rerender) => !rerender);
      })
      .catch((error) => {
        setImageFormLoading(false);
        setBorderColor("red");
        setErrorMsg(error.response.data.message);
      });
  };

  const getUsers = () => {
    axios
      .get(`${config.baseURL}/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log("promise fulfilled");
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const friend = (id) => {
    axios
      .post(
        `${config.baseURL}/friend`,
        { friendid: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log("promise fulfilled");
        getUsers();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const unfriend = (id) => {
    axios
      .delete(`${config.baseURL}/friend/?id=${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log("promise fulfilled");
        getUsers();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createChat = () => {
    axios
      .post(
        `${config.baseURL}/conversation?sender=${localStorage.getItem(
          "user_id"
        )}&receiver=${match.params.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        if (response.data.rowCount > 0) {
          history.push(`/messages/${response.data.rows[0].id}`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const checkChat = () => {
    axios
      .get(
        `${config.baseURL}/checkConversation?sender=${match.params.id
        }&receiver=${localStorage.getItem("user_id")}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        if (response.data.rowCount > 0) {
          history.push(`/messages/${response.data.rows[0].id}`);
        } else {
          createChat();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <header>
        <TopBar />
      </header>
      <div
        style={{
          backgroundColor: "#e3e8ee",
          height: "100vh",
          overflow: "auto",
          paddingTop: "50px",
          paddingBottom: "50px",
        }}
      >
        {friendList.length == 0 ? (
          <></>
        ) : (
          <Modal show={showFriendList} onHide={() => setShowFriendList(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Friends ({friendList[0].friendcount})</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {friendList.map((friend) => (
                <div style={{ display: "flex", flexDirection: "row" }}>
                  {friend.picurl == null ? (
                    <Image
                      style={{ marginBottom: 10, flexShrink: 0.2 }}
                      src={profilephoto}
                      width="50px"
                      height="50px"
                      roundedCircle
                    />
                  ) : (
                    <Image
                      style={{ marginBottom: 10, flexShrink: 0.2 }}
                      src={friend.picurl}
                      width="50px"
                      height="50px"
                      roundedCircle
                    />
                  )}
                  <p
                    style={{
                      flexGrow: 1,
                      marginLeft: 20,
                      marginTop: 10,
                      fontWeight: 600,
                      textTransform: "capitalize",
                    }}
                  >
                    {friend.name}
                  </p>
                  <div style={{ justifyContent: "flex-end" }}>
                    <Button className="btn btn-primary" onClick = {() => history.push(`/profile/${friend.id}`)}>View Profile</Button>
                  </div>
                </div>
              ))}
            </Modal.Body>
          </Modal>
        )}

        <Container
          className="postscontainer"
          style={{ backgroundColor: "#fff" }}
        >
          <Row>
            <Col>
              {PageProfile.picurl == null ? ( // If no profile pic
                <Image
                  className="shadow post"
                  src={profilephoto}
                  style={{
                    width: "120px",
                    height: "120px",
                  }}
                  roundedCircle
                ></Image>
              ) : (
                // else use the user's profile pic
                <Image
                  className="shadow post"
                  src={PageProfile.picurl}
                  style={{
                    width: "120px",
                    height: "120px"
                  }}
                  roundedCircle
                ></Image>
              )}

              {(PageProfile.id != userProfile.id && friendship.length == 0) || loading ? (
                <Button onClick={() => friend(match.params.id)}>
                  Add as Friend
                </Button>
              ) : PageProfile.id == userProfile.id ? (
                <Switch
                  checked={userProfile.privacy}
                  onChange={handlePrivacyChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              ) : friendship[0].status == "requested" ?(
                <>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="save-button"
                  style={{
                    backgroundColor: "#4267B2",
                    color: "white",
                    width: "auto",
                    marginBottom: 10,
                    marginTop: 5,
                    border: "1px solid #4267B2",
                    backgroundColor: "#4267B2",
                    borderRadius: 5,
                    fontWeight: 500,
                  }}
                  onClick={() => friend(match.params.id)}
                >
                Accept
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="save-button"
                  style={{
                    backgroundColor: "white",
                    color: '#4267B2',
                    width: "auto",
                    marginBottom: 10,
                    marginTop: 5,
                    border: "1px solid #4267B2",
                    borderRadius: 5,
                    fontWeight: 500,
                  }}
                  onClick={() => unfriend(match.params.id)}
                >
                Decline
                </motion.button>
                </>
                
              ) : friendship[0].status == "accepted" ? (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="save-button"
                  style={{
                    width: "auto",
                    marginBottom: 10,
                    marginTop: 5,
                    border: "1px solid #4267B2",
                    backgroundColor: "#4267B2",
                    borderRadius: 5,
                    fontWeight: 500,
                  }}
                  onClick={() => unfriend(match.params.id)}
                >
                Unfriend
                </motion.button>
              ) : ""}

              {/* {friendship.length != 0 ? (
              {PageProfile.id != userProfile.id && friendship.length == 0 ? (
                <Button onClick={() => friend(match.params.id)}>
                  Add as Friend
                </Button>
              ) : friendship.status == "accepted" ? (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="save-button"
                  style={{
                    width: "auto",
                    marginBottom: 10,
                    marginTop: 5,
                    border: "1px solid #4267B2",
                    backgroundColor: "#4267B2",
                    borderRadius: 5,
                    fontWeight: 500,
                  }}
                  onClick={() => unfriend(match.params.id)}
                >
                  Remove as Friend
                </motion.button>
              ) : (
                ""
              )} */}



              {localStorage.getItem("user_id") == match.params.id ? (
                <div>
                  <Form onSubmit={createImagePost}>
                    <Form.Group controlId="formFileSm" className="mb-3">
                      <Form.Control
                        name="file"
                        type="file"
                        size="sm"
                        onChange={handleImageUploadChange}
                      />
                    </Form.Group>
                    {errorMsg != "" ? (
                      <p
                        style={{
                          color: "red",
                          fontSize: "0.85em",
                          marginLeft: 15,
                        }}
                      >
                        {errorMsg}!
                      </p>
                    ) : (
                      <></>
                    )}
                    {!null ? (
                      <Button
                        style={{ backgroundColor: "#4267B2", width: "100%" }}
                        variant="primary"
                        type="submit"
                      >
                        Upload photo
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        disabled
                        style={{ backgroundColor: "#4267B2", width: "100%" }}
                      >
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      </Button>
                    )}
                  </Form>
                </div>
              ) : (
                ""
              )}
            </Col>
            <Col>
              {PageProfile.id == userProfile.id ? (
                <Container>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicEmail"
                      onChange={handleChange}
                    >
                      <Form.Label>Name </Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        onChange={handleChange}
                        value={Input.name}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Bio</Form.Label>
                      <Form.Control
                        type="text"
                        name="bio"
                        as="textarea"
                        onChange={handleChange}
                        value={Input.bio}
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Form>
                  {alertContent == null ? (
                    <Alert variant="danger">
                      <Alert.Heading>Error!</Alert.Heading>
                      <p>{alertContent}</p>
                    </Alert>
                  ) : (
                    ""
                  )}
                </Container>
              ) : (
                <Container>
                  <h2 style={{ marginTop: 10, marginBottom: 20 }}>
                    {PageProfile.name}
                  </h2>
                  <p style={{ marginTop: 10, marginBottom: 20 }}>
                    {PageProfile.bio == null ? "no bio yet" : PageProfile.bio}
                  </p>
                </Container>
              )}
              {friendship.length != 0 &&
                localStorage.getItem("user_id") != match.params.id ? (
                <Button
                  style={{ color: "white", backgroundColor: "#32CD32" }}
                  class="btn"
                  onClick={() => checkChat()}
                >
                  Chat
                </Button>
              ) : (
                <></>
              )}
              {friendList.length == 0 ? (
                <p style={{ marginTop: 15 }}>No Friends Yet</p>
              ) : (
                <h6
                  style={{ marginTop: 15 }}
                  onClick={() => {
                    setShowFriendList(true);
                  }}
                >
                  {friendList[0].friendcount} Friends
                </h6>
              )}
            </Col>
          </Row>
        </Container>
        {PageProfile.id != userProfile.id ? (
          <Container>
            <Row>
              <h2 style={{ marginTop: 50, marginBottom: 30 }}>
                Mutual Friends
              </h2>
            </Row>
            {mutualfriendsLoading ? (
              <Row
                className="flex-row flex-nowrap overflow-auto"
                style={{ overflow: "hidden" }}
              >
                <>
                  {Array.from(new Array(5)).map((item, index) => (
                    <UserSkeleton key={index} />
                  ))}
                </>
              </Row>
            ) : (
              <Row
                className="flex-row flex-nowrap overflow-auto"
                style={{ overflow: "hidden" }}
              >
                <>
                  {mutualfriends.map((user) => (
                    <Card
                      onClick={() => { history.push(`./${user.id}`) }}
                      className="shadow"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "18rem",
                        marginTop: 10,
                        marginBottom: 10,
                        paddingTop: 15,
                        paddingBottom: 15,
                        marginRight: 20,
                        border: "1px solid #d3d3d3",
                        borderRadius: 10,
                      }}
                      key={user.id}
                    >
                      {user.picurl == null ? (
                        <Image
                          src={profilephoto}
                          roundedCircle
                          width="150px"
                          height="150px"
                        />
                      ) : (
                        <Image
                          src={user.picurl}
                          roundedCircle
                          width="150px"
                          height="150px"
                        />
                      )}
                      <Card.Body>
                        <Card.Title style={{ textTransform: "capitalize" }}>
                          {user.name}
                        </Card.Title>
                      </Card.Body>

                      {user.friended ? (
                        <Button
                          style={{
                            width: "auto",
                            marginBottom: 10,
                            marginTop: 5,
                            color: "#4267B2",
                            border: "1px solid #4267B2",
                            backgroundColor: "white",
                            borderRadius: 5,
                            fontWeight: 500,
                          }}
                          onClick={() => unfriend(user.id)}
                        >
                          Requested
                        </Button>
                      ) : (
                        ""
                      )}
                    </Card>
                  ))}
                </>
              </Row>
            )}
          </Container>
        ) : (
          ""
        )}

        {PageProfile.privacy === true &&
          friendship.length == 0 &&
          PageProfile.id != userProfile.id ? ( // If true and not friends
          <div>
            <h1>
              This account is private. Follow this account to view their post.
            </h1>
          </div>
        ) : (
          // else display post
          <Container className="postscontainer">
            <h2 style={{ marginTop: 10, marginBottom: 20 }}>Posts</h2>
            {postsLoading ? (
              <>
                {Array.from(new Array(5)).map((item, index) => (
                  <PostSkeleton key={index} />
                ))}
              </>
            ) : (
              <>
                {posts.length == 0 ? (
                  <p style={{ color: "#838383" }}>No content to display</p>
                ) : (
                  <></>
                )}
                {posts.map((post) => (
                  <Post
                    key={post.postid}
                    post={post}
                    setRerender={setRerender}
                  ></Post>
                ))}
              </>
            )}
          </Container>
        )}
      </div>
    </>
  );
};

export default Profile;
