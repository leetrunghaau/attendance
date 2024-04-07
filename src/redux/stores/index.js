import { createStore,applyMiddleware } from 'redux';
import rootReducers from '../reducers';
import thunk from 'redux-thunk';

const loadState = () => {

    try {
      const serializedState = localStorage.getItem('state');
      if(serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (e) {
      return undefined;
    }
  };
  
  const saveState = (state) => {
    try {
      let stateToSave={};
      stateToSave.login=state.login;
      stateToSave.dmDonVi=state.dmDonVi;
      stateToSave.dmDot=state.dmDot;
     // stateToSave.loading=state.loading;
      const serializedState = JSON.stringify(stateToSave);
      localStorage.setItem('state', serializedState);
    } catch (e) {
      // Ignore write errors;
    }
  };

  const peristedState = loadState();



const store = createStore(rootReducers,peristedState,applyMiddleware(thunk));
store.subscribe(() => {
    saveState(store.getState());
  },1000);
export default store;
