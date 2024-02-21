interface WalletBalance {
    currency: string;
    amount: number;
  }
  interface FormattedWalletBalance {
    currency: string;
    amount: number;
    formatted: string;
  }
  
  class Datasource {
    // TODO: Implement datasource class
    private apiUrl: string;

    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
    }

    async getPrices(): Promise<{ [key: string]: number }> {
        try {
        const response = await fetch(this.apiUrl);
        const data = await response.json();
        return data.prices;
        } catch (error) {
        throw new Error('Failed to fetch prices');
        }
    }
  }
  
  const WalletPage: React.FC<BoxProps> = (props: BoxProps) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();
      const [prices, setPrices] = useState({});
  
    useEffect(() => {
      const datasource = new Datasource("https://interview.switcheo.com/prices.json");
      datasource.getPrices().then(prices => {
        setPrices(prices);
      }).catch(error => {
        console.err(error);
      });
    }, []);
  
      const getPriority = (blockchain: any): number => {
        switch (blockchain) {
          case 'Osmosis':
            return 100
          case 'Ethereum':
            return 50
          case 'Arbitrum':
            return 30
          case 'Zilliqa':
            return 20
          case 'Neo':
            return 20
          default:
            return -99
        }
      }

    const balancesWithPriority = balances.map((balance: WalletBalance) => ({
    balance,
    priority: getPriority(balance.blockchain)
    }));
    
    const formattedBalances = balancesWithPriority
    .filter(({ balance, priority }) => balance.amount <= 0 || priority > -99)
    .sort((a, b) => b.priority - a.priority)
    .map(({ balance }) => ({
        ...balance,
        formatted: balance.amount.toFixed()
    }));
  
    const rows = formattedBalances.map((balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow 
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      )
    })
  
    return (
      <div {...rest}>
        {rows}
      </div>
    )
  }