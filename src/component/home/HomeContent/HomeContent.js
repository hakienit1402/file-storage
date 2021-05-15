import React, { useState } from "react";
import DataTable from "./DataTable";
import HomeContentButton from "./HomeContentButton";
import NavigationTab from "./NavigationTab";
// import PropTypes from 'prop-types';
// a.propTypes = {
// };
// HomeContent.defaultProps = {
//   key: 'pictures'
// };
const HomeContent = () => {

  const [listRowKeys, setListRowKeys] = useState([]);
  const [listRecord, setListRecord] = useState([]);
  const [listBreadcrumb, setListBreadcrumb] = useState([''])
  const sendListRowKeys = (listkeys) => {
    setListRowKeys(listkeys)
  }
  const sendListRecords = (listRecords) => {
    setListRecord(listRecords)
  }
  // const [a,setA] = useState(0);
  const setOK = (index) => {
    setListBreadcrumb(listBreadcrumb.slice(0, index + 1));
    // setA(index);
  }

  // console.log(listRecord)
  return (
    <>
      <div style={{ margin: "3rem 2rem 0 0" }}>
        <NavigationTab
          listBreadcrumb={listBreadcrumb}
          setListBreadcrumb={setOK}
        />
      </div>
      <div>
        <HomeContentButton
        />
      </div>
      <div>
        <DataTable
          sendListRowKeys={sendListRowKeys}
          sendListRecords={sendListRecords}
          setListBreadcrumb={setListBreadcrumb}
        />
      </div>
    </>
  );
};
export default HomeContent;
