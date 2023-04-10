import {  useMemo, useState } from 'react';
import { categorys, tableOrderMenus } from '../src/util/tableOrderMenu';
import { SelectTable, Tabletd, MenuListTable, MenuThead, MenuTbody, SelectedMenuListTable, OrderSummaryTable } from './util/StyledCompents';


function App() {

  const [category, setCategory] = useState('')
  const [cartItems, setCartItems] = useState([])
  const [tableNum, setTableNum] = useState('')
  const [orderSummary, setOrderSummary] = useState([])
  const [orderDetail, setOrderDetail] = useState([])

  const addToCart =  (menu) => {
    
    const foundItem = cartItems.find((el)=> el.menuId === menu.menuId)
    
    // if(foundItem){
    //     setCart([...cartItems,{...foundItem, quantity : foundItem.quantity + 1}])
    // }    

    // else{
    // setCart([...cartItems,{
    //   menuId : menu.menuId,
    //   menuName : menu.menuName,
    //   price : menu.price,
    //   quantity : 1
    // }])
    // }

    if (foundItem) {
      setQuantity(foundItem)
    }

    else { // 장바구니에 없는 상품을 추가할 경우, cartItems에 새로운 엘리먼트로 추가하기
      setCartItems([...cartItems,{
        menuId: menu.menuId,
        menuName : menu.menuName,
        price : menu.price,
        quantity: 1,
      }])
    }
  }
  


  const setQuantity = (item) => {
    
    const foundItem = cartItems.find((el) => el.menuId === item.menuId)
    const idx = cartItems.indexOf(foundItem)
    
    const cartItem = {
      menuId : foundItem.menuId,
      menuName : foundItem.menuName,
      price : foundItem.price,
      quantity : foundItem.quantity + 1
    }

    setCartItems([
      ...cartItems.slice(0, idx),
      cartItem,
      ...cartItems.slice(idx + 1)
    ])

  }    
  const deleteMenu = (menuId) => {
    setCartItems(cartItems.filter((el)=>{
      return el.menuId !== menuId
    }))
  }

  const deleteAllMenu = () =>{
    setCartItems([])
  } 

  const totalPrice = useMemo(() => {
    return cartItems
      .map((item) => {
        const {menuId} = item;
        const foundItem = cartItems.find((el) => el.menuId === menuId);
        return foundItem.price * foundItem.quantity;
      })
      .reduce((l, r) => l + r, 0);
  }, [cartItems]);

  const totalCount = useMemo(() => {
    return cartItems
      .map((item) => {
        const {menuId} = item;
        const foundItem = cartItems.find((el) => el.menuId === menuId);
        return foundItem.quantity;
      })
      .reduce((l, r) => l + r, 0);
  }, [cartItems]);



const fetchOrder = async (tableNum) => {

  try{
    
      const responseSummary = await fetch(`http://localhost:8080/order/summary?tableNum=${tableNum}`)
      const summary = await responseSummary.json();
      setOrderSummary(summary.data);


      if(orderSummary){ 
      const responseDetail = await fetch(`http://localhost:8080/order/detail?orderId=${orderSummary.orderId}`)
      const detail = await responseDetail.json();
      setOrderDetail(detail.data);
      
      }

    }
    catch(err){
      alert(err.message);
  }
}

const selectTableNum = (tableNum) =>{
  deleteAllMenu();
  setTableNum(tableNum);
  fetchOrder(tableNum);
}

const saveOrder = async () => {

  try{
      const orderInfo = cartItems;
          for(const info of orderInfo){
          info.tableNum = tableNum;
    }

    await fetch("http://localhost:8080/order/save",{
      body : JSON.stringify(orderInfo),
      headers : {
        "content-Type" : "application/json"
      },
      method : "POST"
    })
    deleteAllMenu();
    setTableNum('');
  }
  catch(err){
    console.log(err)
  }
} 


const updateOrderTable = async (orderId) => {

  try{
    await fetch(`http://localhost:8080/order/update?orderId=${orderId}`)
    window.location.reload();
  }
  catch(err){
    console.log(err)
  }
} 

  return (
       <div className='App'>          
        <div>
          <p>STEP 1. 테이블을 선택해주세요.</p>
          <SelectTable>
            <tbody>
            <tr>
              <Tabletd onClick={()=>selectTableNum(1)}>1</Tabletd>
              <Tabletd onClick={()=>selectTableNum(2)}>2</Tabletd>
              <Tabletd onClick={()=>selectTableNum(3)}>3</Tabletd>
              <Tabletd onClick={()=>selectTableNum(4)}>4</Tabletd>
              <Tabletd onClick={()=>selectTableNum(5)}>5</Tabletd>
              <Tabletd onClick={()=>selectTableNum(6)}>6</Tabletd>
              <Tabletd onClick={()=>selectTableNum(7)}>7</Tabletd>
              <Tabletd onClick={()=>selectTableNum(8)}>8</Tabletd>
              <Tabletd onClick={()=>selectTableNum(9)}>9</Tabletd>
              <Tabletd onClick={()=>selectTableNum(10)}>10</Tabletd>
            </tr>   
            </tbody>
          </SelectTable>
        </div>
        {(tableNum !== '' && orderSummary===null && (
        <>
        <p>STEP 2. 카테고리를 선택 후 주문할 메뉴를 추가해 주세요.</p>
        <span>카테고리 선택 </span>
        <select onChange = {(e)=>{setCategory(e.target.value)}}>
                <option>===선택하세요===</option>
              {categorys.map((category)=>(
                <option value={category}>{category}</option>
              ))}
          </select>
              <MenuListTable>
                <MenuThead>
                      <tr>
                          <td>메뉴ID</td>
                          <td>메뉴이름</td>
                          <td>가격</td>
                      </tr>
                  </MenuThead>
                  <MenuTbody>
                      {tableOrderMenus.filter((tableOrderMenu)=>(tableOrderMenu.category === category)).map((menu)=>(
                          <tr key ={menu.menuId} onClick={()=>addToCart(menu)}>  
                            <td value = {menu.menuId}>{menu.menuId}</td>
                            <td value = {menu.menuName}>{menu.menuName}</td>
                            <td value = {menu.price}>{menu.price}</td>
                          </tr>
                      ))} 
                  </MenuTbody>
                </MenuListTable>
        </>
        )
        )}
                {cartItems.length > 0 && (
                  <div>
                    <p>STEP3. 선택한 메뉴와 결제금액을 확인해 주세요.</p>
                      <SelectedMenuListTable>
                          <MenuThead>
                              <tr>
                                <td>메뉴ID</td>
                                <td>메뉴이름</td>
                                <td>가격</td>
                                <td>수량</td>
                                <td>삭제</td>
                              </tr>
                          </MenuThead>
                          <MenuTbody>
                          {cartItems.map((item)=>(
                              <tr>
                                <td>{item.menuId}</td>
                                <td>{item.menuName}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                                <button onClick={()=>deleteMenu(item.menuId)}>삭제</button>
                              </tr>
                          ))}
                          </MenuTbody>
                      </SelectedMenuListTable>
                  </div>
                )
          }
           {cartItems.length > 0 && (
           <div>
              <button onClick={deleteAllMenu}>선택 메뉴 모두 삭제</button> 
              <p>총 수량 : {totalCount}</p> 
              <p>총계 : {totalPrice} </p> 
              <button onClick={saveOrder}>주문하기</button>
           </div> 
            )}  
          
          {orderSummary !==null && orderDetail.length > 0 && 
                <div>
                <div>
                    <p style={{"fontSize" : "20px","color": "blue"}}>식사중인 테이블입니다.</p>
                    <p style={{"color":"red"}}>주문정보를 확인해 주세요.</p>
                      
                    <OrderSummaryTable>
                          <MenuThead>
                              <tr>
                                <th>주문번호</th>
                                <th>주문 일자</th>
                                <th>총 수량</th>
                                <th>총 금액</th>
                              </tr>
                          </MenuThead>
                          <MenuTbody>
                              <tr>
                                <td>{orderSummary.orderId}</td>
                                <td>{orderSummary.orderDate}</td>
                                <td>{orderSummary.totalQuantity}</td>
                                <td>{orderSummary.totalPrice}</td>
                              </tr>
                          </MenuTbody>
                      </OrderSummaryTable>
                      
                      <SelectedMenuListTable>
                          <MenuThead>
                              <tr>
                                <th>메뉴ID</th>
                                <th>메뉴이름</th>
                                <th>가격</th>
                                <th>수량</th>
                              </tr>
                          </MenuThead>
                          <MenuTbody>
                          {orderDetail.map((item)=>(
                              <tr>
                                <td>{item.menuId}</td>
                                <td>{item.menuName}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                              </tr>
                          ))}
                          </MenuTbody>
                      </SelectedMenuListTable>
                      <button onClick={()=>updateOrderTable(orderSummary.orderId)}>식사완료</button>
                  </div>
                  
                  </div>
                  }
    </div>
  )
}

export default App;
