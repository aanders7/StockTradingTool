import React from 'react'

import homeloginStyle from '../../styles/HomeLogin.module.css'

const Field = React.forwardRef(({label, type}, ref) => {
    return (
      <div>
        <label className={homeloginStyle.form_label} >{label}</label>
        <input ref={ref} type={type} className={homeloginStyle.form_input} />
      </div>
    );
});

export default Field;