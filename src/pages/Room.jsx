import { auth, db } from "../config/firebase";
import { useState, useEffect, useContext } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../context/AuthService";
import CircularProgress from '@material-ui/core/CircularProgress';
import Item from "../component/Item";

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '480px',
        width: '350px',
        margin: '0 auto',
    }
})

const Room = () => {
    const classes = useStyles();
    const [messages, setMessages] = useState(null);
    const [value, setValue] = useState('');
    const user = useContext(AuthContext);

    // 通信をするときはuseEffect
    useEffect(() => {
        db.collection("messages").onSnapshot((snapshot) => {
            // データの所得の処理
            const messages = snapshot.docs.map(doc => {
                return doc.data()
            })
            setMessages(messages)
        })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        // firestoreに送信する処理
        const now = new Date() //データオブジェクトの作成
        const time = now.getTime()　//データをソートするためデータオブジェクトを数値に変換
        db.collection("messages").add({
            user: user.displayName,
            content: value,
            time: time
        })
        setValue("")
    }


    //非同期処理 
    const submit = async () => {
        const data = await db.collection("messages").doc("42719PIOxJd4KCocXn3n").get()
            .then(doc => {
                if (doc.exists) {
                    return doc.data()
                }
            }).catch(err => { console.log(err) })
        console.log(data.user)
    }



    return (
        <div className={classes.container}>
            <h1>チャットルーム</h1>
            <ul>
                {messages ?
                    // messagesのデータがあったら
                    messages.sort((a, b) => {
                        if (a.time < b.time) return -1
                        if (a.time > b.time) return 1
                        return 0
                    })
                        .map((message) => (
                            <Item user={message.user} content={message.content} />
                        ))
                    : <CircularProgress />//データがなかったら
                }
            </ul>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
                <button type="submit">送信</button>
            </form>
            <button
                onClick={() => {
                    auth.signOut()
                }}>ログアウト
            </button>
            <button onClick={submit}>submit</button>
        </div>
    );
};

export default Room;