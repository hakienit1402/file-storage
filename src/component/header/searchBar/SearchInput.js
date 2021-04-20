import React, { useState } from 'react';
import { Input, AutoComplete, Menu } from 'antd';

const { SubMenu } = Menu;
function getRandomInt(max, min = 0) {
	return Math.floor(Math.random() * (max - min + 1)) + min; // eslint-disable-line no-mixed-operators
}

const searchResult = (query) => {
	return new Array(getRandomInt(5))
		.join('.')
		.split('.')
		.map((_, idx) => {
			const category = `${query}`;
			return {
				value: category,
				label: (
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<span>
							{query}
							<a
								href={`http://localhost:8081/songName?title=${query}`}
								target="_blank"
								rel="noopener noreferrer"
							></a>
						</span>
						<span>{getRandomInt(200, 100)} kết quả</span>
					</div>
				),
			};
		});
};

const SearchInput = () => {
	const [options, setOptions] = useState([]);

	const handleSearch = (value) => {
		setOptions(value ? searchResult(value) : []);
	};

	const onSelect = (value) => {
		console.log('onSelect', value);
	};

	return (
		<AutoComplete
			dropdownMatchSelectWidth={252}
			style={{
				width: 600,
			}}
			options={options}
			onSelect={onSelect}
			onSearch={handleSearch}
		>
			<Input.Search size="large" placeholder="input here" enterButton />
		</AutoComplete>
	);
};

export default SearchInput;
