import Image from "next/image";
import logo from "../../../public/logo.png";

function Header(): React.ReactElement {
  return (
    <header className="header">
      <Image alt="logo" src={logo} className="logo" width="96" height="96" />
      <h1 className="title">Takip</h1>
    </header>
  );
}

export default Header;
