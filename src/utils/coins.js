import t from "../lang/t";
import BitcoinIcon from "../svg-icon/BitcoinIcon";
import EthereumIcon from "../svg-icon/EthereumIcon";
import TetherIcon from "../svg-icon/TetherIcon";
import LitecoinIcon from "../svg-icon/LitecoinIcon";

const coins = {
    btc: {
        name: t('bitcoin'),
        icon: <BitcoinIcon/>
    },
    eth: {
        name: t('ethereum'),
        icon: <EthereumIcon/>
    },
    usdt: {
        name: t('tether'),
        icon: <TetherIcon/>
    },
    ltc: {
        name: t('litecoin'),
        icon: <LitecoinIcon/>
    },
}


export default coins;
