import { useState } from "react";
import { Link } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { auth } from "../config/firebase";
import { useForm } from "react-hook-form";
import InputAdornment from '@material-ui/core/InputAdornment';
import VisibilityIcon from '@material-ui/icons/Visibility';




const useStyles = makeStyles({
    title: {
        color: 'red',
    },
    form: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        height: '480px',
        width: '350px',
        margin: '0 auto',
    },
})

const Signup = () => {
    // const [username, setUsername] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const classes = useStyles();
    const [pass, set] = useState('password');
    const { register, handleSubmit, errors, reset } = useForm()
    const mailReg = new RegExp("^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}.[A-Za-z0-9]{1,}$")
    const passReg = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})")


    const signup = (data) => {
        // e.preventDefault();
        auth.createUserWithEmailAndPassword(data.email, data.password)
            .then((result) => {
                // ログインが成功した時の処理
                result.user.updateProfile({ displayName: data.username }).then(() => {
                    console.log('ユーザー作成成功', result);
                })
            })
            .catch((error) => {
                // ログインが失敗した時の処理
                console.log('ユーザー作成失敗', error);
            })
        reset()
    }

    return (
        <form className={classes.form} onSubmit={handleSubmit(signup)}>
            <h1 className={classes.title}>ユーザー登録ページ</h1>
            <TextField
                name="username"
                // value={username}
                // onChange={(e) => setUsername(e.target.value)}
                variant='filled'
                label="ユーザーネーム"
                inputRef={register({
                    required: "名前を入力してください",
                    minLength: {
                        value: 2,
                        message: "名前は2文字以上入力してください"
                    }
                })}
            />
            {errors.username && errors.username.message}
            <TextField
                name="email"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                variant='filled'
                label="メールアドレス"
                inputRef={register({
                    pattern: {
                        value: mailReg,
                        message: "正しいメールアドレスを入力して下さい"
                    }
                })}
            />
            {errors.email && errors.email.message}
            <TextField
                name="password"
                type={pass}
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                variant='filled'
                label="パスワード"
                inputRef={register({
                    pattern: {
                        value: passReg,
                        message: "半角英字と半角数字それぞれ1文字以上含む6文字以上の必要があります"
                    }
                })}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="start" onClick={() => set(pass === 'password' ? 'text' : 'password')}>
                            <VisibilityIcon />
                        </InputAdornment>
                    ),
                }}
            />
            {errors.password && errors.password.message}
            <Link to='/login'>アカウントをすでにお持ちの方</Link>
            <Button type='submit' variant='contained' color='primary'>登録</Button>
        </form>
    );
};

export default Signup;

// https://github.com/kei-nishikawa48/chatapp42/blob/main/src/pages/Signup.jsx