import UserService from "../services/UserService";
import {Button} from "react-bootstrap";

const Welcome = () => (
  <div className={"mt-5 d-flex justify-content-center"}>
    <Button onClick={() => UserService.doLogin()}>Login</Button>
  </div>
)

export default Welcome
