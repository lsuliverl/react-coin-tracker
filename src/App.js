import { useEffect, useState } from "react";

function App() {
    const [loading, setLoading] = useState(true); //loading 글자를 띄울지 말지를 결정하는 함수
    const [coins, setCoins] = useState([]);
    useEffect(() => {
        fetch("https://api.coinpaprika.com/v1/tickers") // 정보 가져올 url
            .then((response) => response.json()) // url에서 가져온 정보를 json으로 변환
            .then((json) => {
                setCoins(json); // 변환된 json을 coins(빈 array)에 넣기
                setLoading(false); // loading 글자 지우기
            });
    }, []);
    return (
        //함수 사이에 string 삽입 시: `~`, string 사이에 인자나 함수 삽입 시: ${~}
        <div>
            <h1>코인! {loading ? "" : `(${coins.length})`}</h1>
            {loading ? (
                <strong>로딩중...</strong>
            ) : (
                <select>
                    {coins.map((coin) => (
                        <option key={coin.id}>
                            {coin.name} ({coin.symbol}): ${coin.quotes.USD.price.toFixed(2)} USD
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
}

export default App;
