import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// import React, { Component } from 'react';
// import { Formik } from 'formik';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import {
//   SearchBar,
//   SearchForm,
//   SearchButton,
//   ButtonLabel,
//   SearchInput,
// } from './Searchbar.styled';

// class Searchbar extends Component {
//   state = {
//     searchQuery: '',
//   };

//   handleInputChange = event => {
//     const { value } = event.currentTarget;
//     this.setState({
//       searchQuery: value.toLowerCase().trim(),
//     });
//   };

//   handleSubmit = event => {
//     event.preventDefault();
//     if (this.state.searchQuery.trim() === '') {
//       return toast.error('Enter valid search');
//     }
//     this.props.onSubmit(this.state.searchQuery);
//     this.formReset();
//   };

//   formReset = () => {
//     this.setState({ searchQuery: '' });
//   };

//   render() {
//     return (
//       <header className="searchbar">
//         <form className="form" onSubmit={this.handleSubmit}>
//           <button type="submit" className="button">
//             <span className="button-label">Search</span>
//           </button>

//           <input
//             value={this.state.searchQuery}
//             onChange={this.handleInputChange}
//             className="input"
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//           />
//         </form>
//       </header>
//     );
//   }
// }

// export default Searchbar;
