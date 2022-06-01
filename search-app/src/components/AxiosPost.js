import React, { useEffect, useState } from "react";
import * as ReactBootStrap from "react-bootstrap";
import axios from "axios";

const AxiosPost = () => {
  const [products, setProducts] = useState({ items: [] });
  const [search,setSearch] = useState("");
  const [c1,setC1] = useState("");
  const [c2,setC2] = useState("");
  const [c3,setC3] = useState("");

  useEffect(() => {
    const fetchProductList = async () => {
      const { data } = await axios(
        "https://migrocer-test.s3.ap-south-1.amazonaws.com/data_requests/products.json"
      );
      setProducts({ items: data.data });
    };
    fetchProductList();
  }, [setProducts]);

  const category1 = [...new Set(products.items.map(item => item.category_level1))];
  const category2 = [...new Set(products.items.map(item => item.category_level2))];
  const category3 = [...new Set(products.items.map(item => item.category_level3))];
  // console.log(c1);
  // console.log(c2);
  // console.log(c3);
  return (
    <div>
      
      <div style={{ display: "flex", justifyContent: "space-between", height: "50px"}}>
      <input type="text" placeholder="Search..." className="form-control" style={{marginTop:10, marginBottom:50, width:"40%"}}
          onChange={(e)=>{
            setSearch(e.target.value);
          }}
        />
        <select style={{width:"10%"}} onChange={(e)=>{
            setC1(e.target.value);
          }}>
          <option>category1</option>
        {category1.map(item => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
        </select>
        <select style={{width:"10%"}} onChange={(e)=>{
            setC2(e.target.value);
          }}>
          <option>category2</option>
        {category2.map(item => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
        </select>
        <select style={{width:"10%"}} onChange={(e)=>{
            setC3(e.target.value);
          }}>
          <option>category3</option>
        {category3.map(item => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
        </select>
      </div>
      <br/>
      <ReactBootStrap.Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>category_level1</th>
            <th>category_level2</th>
            <th>category_level3</th>
          </tr>
        </thead>
        <tbody>
          {
            products.items.filter((val)=>{
              if(search === "" && c1 === "category1" && c2 === "category2" && c3 === "category3"){
                return val;
              }
              else if(c1 !== "category1" && c2 === "category2" && c3 === "category3" ){
                  return val.category_level1 === c1
              }
              else if(c1 !== "category1" && c2 !== "category2" && c3 !== "category3"){
                 return val.category_level1 === c1 && val.category_level2 === c2 && val.category_level3 === c3 && val.name.toLowerCase().includes(search.toLowerCase());
              }
              else if(
                val.name.toLowerCase().includes(search.toLowerCase())
              ){
                return val;
              }
            }).map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.category_level1}</td>
                <td>{item.category_level2}</td>
                <td>{item.category_level3}</td>
              </tr>
            ))}
        </tbody>
      </ReactBootStrap.Table>
    </div>
  );
};

export default AxiosPost;
