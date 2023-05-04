
import data from 'autoprefixer';
import React, { useEffect, useState} from 'react'
// import DataTable from 'react-data-table-components';
import DataTable from 'react-data-table-component';

export default function Table() {
	const [products,setProduct]=useState([]);
	const [inputValue, setInputValue] = useState('');
	useEffect(() => {
		const fetchSearchResults = async () => {
			const response = await fetch(`https://api.escuelajs.co/api/v1/products?product=${inputValue}`);
			const data = await response.json();
			setProduct(data);
		};
		fetchSearchResults();
	}, [inputValue]);
	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};
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
	return (
		
		<div className='text-3xl font-bold'>
			<DataTable 
				title="All Products Listing"
				columns={columns} 
				data={products}
				subHeader
				
				pagination
			/>
		</div>
	)
}
