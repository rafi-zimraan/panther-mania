// import React, {useReducer, createContext} from 'react';
// import jsonStringify from '../utils/jsonStringify';

// const initialValue = {
//   jenisKelamin: '',
//   ukuranBaju: '',
//   tanggalLahir: '',
//   agama: '',
//   statusMenikah: '',
//   typeModal: '',
//   valueCheckBox: '',
//   isVisibleModalCheckBox: false,
// };

// const checkBoxTypes = {
//   ACTION_JENIS_KELAMIN: 'ACTION_JENIS_KELAMIN',
//   ACTION_UKURAN_BAJU: 'ACTION_UKURAN_BAJU',
//   ACTION_TANGGAL_LAHIR: 'ACTION_TANGGAL_LAHIR',
//   ACTION_AGAMA: 'ACTION_AGAMA',
//   ACTION_STATUS_MENIKAH: 'ACTION_STATUS_MENIKAH',
//   ACTION_TYPE_MODAL: 'ACTION_TYPE_MODAL',
//   ACTION_VALUE_CHECKBOX: 'ACTION_VALUE_CHECKBOX',
//   ACTION_OPEN_MODAL: 'ACTION_OPEN_MODAL',
//   ACTION_CLOSE_MODAL: 'ACTION_CLOSE_MODAL',
// };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case checkBoxTypes.ACTION_TYPE_MODAL:
//       console.log(`RESULT CONTEXT TYPE MODAL ${jsonStringify(action)}`);
//       return {typeModal: action.payload};

//     case checkBoxTypes.ACTION_VALUE_CHECKBOX:
//       console.log(`RESULT CONTEXT VALUE CHECKBOX ${jsonStringify(action)}`);
//       return {valueCheckBox: action.payload};

//     case checkBoxTypes.ACTION_OPEN_MODAL:
//       return {isVisibleModalCheckBox: true};

//     case checkBoxTypes.ACTION_CLOSE_MODAL:
//       return {isVisibleModalCheckBox: false};

//     case checkBoxTypes.ACTION_JENIS_KELAMIN:
//       return {jenisKelamin: state.valueCheckBox};

//     case checkBoxTypes.ACTION_UKURAN_BAJU:
//       return {ukuranBaju: state.valueCheckBox};

//     case checkBoxTypes.ACTION_TANGGAL_LAHIR:
//       return {tanggalLahir: state.tanggalLahir};

//     case checkBoxTypes.ACTION_AGAMA:
//       return {agama: state.valueCheckBox};

//     case checkBoxTypes.ACTION_STATUS_MENIKAH:
//       return {statusMenikah: state.valueCheckBox};
//     default:
//       return state;
//   }
// };

// export const ModalCheckboxContext = createContext(initialValue);
// export const ModalCheckboxProvider = ({children}) => {
//   const [state, dispatch] = useReducer(reducer, initialValue);
//   console.log('ini state', state);
//   return (
//     <ModalCheckboxContext.Provider value={{state, dispatch}}>
//       {children}
//     </ModalCheckboxContext.Provider>
//   );
// };
