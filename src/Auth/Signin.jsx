import React, { Fragment, useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { H4, Btn, P } from '../AbstractElements';
import { useNavigate } from 'react-router-dom';
import CustomizerContext from '../_helper/Customizer';
import { useDispatch, useSelector } from 'react-redux';
import { Login } from '../redux/actions/loginAction';
import { showLoading, hideLoading } from '../redux/actions/loadingAction';

// import {Login} from '../Services/Login.service'

// import LoginContext from '../_helper/Login';

const Logins = () => {
  // const { setLoginInfo } = useContext(LoginContext);
  const dispatch = useDispatch();
  const { token, loading } = useSelector(state => state.login);


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [useDomain, setUseDomain] = useState(1);
  const [togglePassword, setTogglePassword] = useState(false);
  const history = useNavigate();
  const { layoutURL } = useContext(CustomizerContext);


  useEffect(() => {
    console.log("TOKEN ON LOGIN======>", token);
    if (token != null) {
      window.location.href = `${process.env.PUBLIC_URL}/dashboard/default/${layoutURL}`;
    }
  }, [token])

  useEffect(() => {
    if (loading)
      dispatch(showLoading());
    else
      dispatch(hideLoading());
  }, [loading])

  const handleChange = event => {
    if(event.target.checked)
    {
      setUseDomain(1); 
    }
    else
    {
      setUseDomain(0); 
    }
  };
  const doLogin = async (e) => {
    dispatch(Login({ username: email, password: password, domain: useDomain }));
    // const result= await Login({username:email,password:password,domain:useDomain})
    // if(result)
    // {
    //   if(result.status=="Ok")
    //   {
    //     setLoginInfo(result.data);
    //     window.location.href = `${process.env.PUBLIC_URL}/dashboard/default/${layoutURL}`;
    //   }
    // }
    // else
    // {
    //   console.log("Dang nhap that bai");
    // }
    // return fetch('/users/authenticate', requestOptions)
    //   .then(handleResponse)
    //   .then((user) => {
    //     // store user details and jwt token in local storage to keep user logged in between page refreshes
    //     setValue("");
    //     setName('Emay Walter');
    //     localStorage.setItem('token', Jwt_token);
    //     window.location.href = `${process.env.PUBLIC_URL}/dashboard/default/${layoutURL}`;
    //     return user;
    //   });
  };

  return (
    <Container fluid={true} className='p-0 login-page'>
      <Row>
        <Col xs='12'>
          <div className='login-card'>
            <div className='login-main login-tab'>
              <Fragment>
                <Form className='theme-form'>
                  <H4>Đăng nhập</H4>
                  <P>Nhập email và mật khẩu để đăng nhập</P>
                  <FormGroup>
                    <Label className='col-form-label'>Email</Label>
                    <Input className='form-control' type='email' onChange={(e) => setEmail(e.target.value)} value={email} />
                  </FormGroup>
                  <FormGroup className='position-relative'>
                    <Label className='col-form-label'>Mật khẩu</Label>
                    <div className='position-relative'>
                      <Input className='form-control' type={togglePassword ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)} value={password} />
                      <div className='show-hide' onClick={() => setTogglePassword(!togglePassword)}>
                        <span className={togglePassword ? '' : 'show'}></span>
                      </div>
                    </div>
                  </FormGroup>
                  <div className='position-relative form-group mb-0'>
                  <div className='checkbox'>
                      <Input id='chkDomain' type='checkbox' checked={useDomain==1?true:false} onChange={handleChange} />
                      <Label className='text-muted' for='chkDomain'>
                        Dùng tài khoản domain/outlook
                      </Label>
                    </div>

                    <div className='checkbox'>
                      <Input id='checkbox1' type='checkbox' checked />
                      <Label className='text-muted' for='checkbox1'>
                        Nhớ mật khẩu
                      </Label>
                    </div>
                    <Btn attrBtn={{ color: 'primary', className: 'd-block w-100 mt-2', onClick: (e) => doLogin(e) }}>Đăng nhập</Btn>

                  </div>
                </Form>
              </Fragment>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Logins;
