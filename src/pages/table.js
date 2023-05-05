
import React, { useEffect, useState} from 'react'
// import DataTable from 'react-data-table-components';
import DataTable from 'react-data-table-component';
import Layout from 'src/components/layout';
 function Table({results}) {
	const [products,setProduct]=useState([]);
	useEffect(() => {
        setProduct(results)
	}, []);
	const columns=[
		{
			name:"ProductName",
			selector:(row)=><p style={{fontSize:"12px",fontWeight:"500"}}>{row.title}</p>

		},
		{
			name:"Price",
			selector:(row)=><p style={{fontSize:"12px",fontWeight:"500"}}>{row.price+" $"}</p>
		},
		{
			name:"Category",
			selector:(row)=> <p style={{fontSize:"12px",fontWeight:"500"}}>{row.category.name}</p>
		},
		{
			name:"Photo",
			selector:(row)=> row.images[0]?<img width="100px" height="50px" src={row.images[0]}/>:<img width="100px" height="50px" src="https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg" />
		},
		{
			name:"Action",
			selector:(row)=>(
				<>
					<button style={{margin: "20px"}} type="button" class="btn btn-outline-primary">Edit</button> 
					<button type="button" class="btn btn-outline-danger">Delete</button>
				</>
			)
		},
	]
	function handleSearching(event) {
        const data_searching = results.filter(row => row.title.toLowerCase().includes(event.target.value.toLowerCase())); 
        setProduct(data_searching); 
    }
	return (
		<Layout>
		<div className='text-3xl font-bold'>
			<DataTable 
				title="All Products Listing"
				columns={columns} 
				data={products}
				subHeader	
				pagination
				actions={
					<div className="text-end">
						<input
							type="text"
							className="rounded border-1"
							style={{
								padding: "3px 10px",
								width: "300px",
								fontSize: "15px",
							}}
							placeholder="Search"
							onChange={handleSearching}
						></input>
					</div>
				}
			/>
		</div>
		</Layout>
	)
}
export async function getServerSideProps(){
	const resp= await fetch("https://api.escuelajs.co/api/v1/products")
	const results = await resp.json()
	console.log(results)
			return{
			   props:{
			  results
			 }
			}
			  }

export default Table
