
import './components.css'
import { useEffect } from 'react';
import Notes from './Notes';
import { useNavigate } from 'react-router-dom';

export const Home = (props) => {
  const navigate = useNavigate();
  useEffect(() => {

    if (localStorage.getItem('ismtoken')) {

    }
    else {
      navigate('/login')

    }
  })

  return (
    <div className=''>

      <Notes showAlert={props.showAlert} />
    </div>
  )
}

export default Home;