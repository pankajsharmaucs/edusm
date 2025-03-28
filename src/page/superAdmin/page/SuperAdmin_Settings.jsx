import React, { useEffect, useState } from 'react'
import PreLoader from '../../../components/preloader/PreLoader';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SuperAdmin_Settings = () => {

  const [loading, SetLoading] = useState(true);
  const [Msg, setMsg] = useState(true);
  const [ErrorMsg, setErrorMsg] = useState('');


  const [App1, setApp1] = useState('');
  const [file1, setfile1] = useState(null);

  const selectFile = (App, file) => {
    // const imageUrl = URL.createObjectURL(file);
    if (App === 'App1') {
      // setApp1(imageUrl);
      setfile1(file)
    }
  }

  useEffect(() => {
    SetLoading(false);
  }, [])


  async function UpdateAppFile() {
    setErrorMsg('');
    setMsg("");

    try {
      if ( file1 == ""  ) {
        setErrorMsg("Please fill select apk file"); return;
      }


      SetLoading(true)

      const user_id = localStorage.getItem('superUserId');
      const token = localStorage.getItem('superToken');


      let dataList = {
        type: "updated",
        user_id: user_id,
        token: token,
        app1: file1,
      }


      let url = import.meta.env.VITE_API_ADMIN_UPDATE_ANDROID_APP;
      const response = await axios.post(url, dataList,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      // console.log(response);return

      if (response.data.msg == "success") {
        const msg = response.data.msg;
        SetLoading(false)
        setMsg("App Updated");
        return;
      }
      else {
        setErrorMsg(response.data.msg);
        SetLoading(false)
        return;
      }
    } catch (error) {
      SetLoading(false)
      console.error('Login failed:', error);
    }
  }

  return (
    <>
      {
        loading
          ?
          <PreLoader />
          :
          <section className='container-fluid p-0'>
            <div className="container p-3">

              <div className="row p-md-3 p-2 bg-white">
                <h3 className='col-12 text-center'>Update App</h3>

                <div className='form-group col-md-4  py-2 mb-md-4 mb-2 '>
                  <div className='border p-2'>
                    {/* <label htmlFor="">Select .apk file </label> */}
                    {
                      App1 &&
                      <div className='p-3 imagebox'>
                        <img src={`${App1}`} alt="" width={"100%"} />
                      </div>
                    }

                    <input type="file"
                      onChange={(e) => selectFile('App1', e.target.files[0])}
                      accept=".apk,application/vnd.android.package-archive"
                      className='form-control'
                    />
                  </div>
                </div>

                <div className='col-12 my-3 text-center '>
                  <button className='btn btn-success' onClick={() => { UpdateAppFile() }} >Update Now</button>
                </div>

                <div className='col-12 my-3 text-center '>
                  {
                    ErrorMsg && <p className='text-danger fw-bold'>{ErrorMsg}</p>
                  }

                  {
                    Msg && <p className='text-success fw-bold'>{Msg}</p>
                  }
                </div>

              </div>


            </div>
          </section>
      }
    </>
  )
}

export default SuperAdmin_Settings