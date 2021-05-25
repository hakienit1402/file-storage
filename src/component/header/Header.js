import { Col, Image, Row } from "antd";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/googleLogo.png";
import AvatarGroup from "./avatar/AvatarGroup";
import "./HeaderStyle.css";
import SearchInput from "./searchBar/SearchInput";
export class Header extends Component {
  state = {
    pageIndex: 0,
  };

  render() {
    return (
      <>
        <Row style={{}}>
          <Col span={5} style={{}}>
            <Link to="/">
              <Image
                preview={false}
                src={logo}
                style={{
                  width: "130px",
                  padding: "0.3rem 0 0 1rem",
                }}
              />
            </Link>
          </Col>
          <Col
            span={15}
            className="inputSearchHeader"
            style={{ display: "flex" }}
          >
            <SearchInput></SearchInput>
          </Col>
          <Col span={4}>
            <AvatarGroup style={{}}></AvatarGroup>
          </Col>
        </Row>
      </>
    );
  }
}

export default Header;
