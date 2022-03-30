import { useSelector, RootStateOrAny } from 'react-redux'
import Authorization from './pages/Authorization/Authorization';
import Contacts from './pages/Contacts/Contacts';


function App() {

  const authorized = useSelector((state: RootStateOrAny) => state.auth.userAuthorized)
  return (
    <div className="App">
      {
        authorized ?
          <Contacts />
          :
          <Authorization />
      }
    </div>
  );
}

export default App;
