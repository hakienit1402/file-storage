import React,{useState} from "react";
import DataTable from "./DataTable";
import HomeContentButton from "./HomeContentButton";
import NavigationTab from "./NavigationTab";
const HomeContent = ({ active,listBreadcrumb }) => {
  const [listRowKeys,setListRowKeys] = useState([]);
  const [listRecord,setListRecord] = useState([]);
  const sendListRowKeys =(listkeys)=>{
    setListRowKeys(listkeys)
  }
  const sendListRecords =(listRecords)=>{
    setListRecord(listRecords)
  }
  console.log(listRowKeys)
  console.log(listRecord)
  return (
    <>
      <div style={{ margin: "3rem 2rem 0 0" }}>
        <NavigationTab listBreadcrumb={listBreadcrumb} />
      </div>
      <div>
        <HomeContentButton 
        
        />
      </div>
      <div>
        <DataTable active={active} 
       sendListRowKeys={sendListRowKeys}
       sendListRecords={sendListRecords}
        />
      </div>
    </>
  );
};
export default HomeContent;
