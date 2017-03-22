class Machine extends React.Component {
  constructor() {
   super();
   this.state = {
     spin: false,
     winner: false,
     winnerType: 'none',
     spinResults: []
   }
  }
  _addWheels(){ //add three Wheels to the machine
    const wheelProps = [
      {id: 1}, {id: 2}, {id: 3}
    ];

    return wheelProps.map((wheel) => {
      return (
        <Wheel
          contents={wheel.contents}
          key={wheel.id}
          reactKey={wheel.id}
          spin={this.state.spin}
          complete={this._onSpinComplete.bind(this)}
          />
      );
    });
  }
  _spinWheels(){ //This is called from the arm Component
    this.setState({
      winner: false,
      spin: true
    });
  }
  _checkForWinner(arr){
    var results = arr;
    var winnerType;
    for (var i = 0; i < results.length; i++) {
      if (!winnerType || winnerType === "*") {
        winnerType = results[i];
      } else if (results[i] !== winnerType && results[i] !== "*") {
        this.setState({winner: false});
        return;
      }
    }
    this.setState({ //Fire if all items are the same or contain wild cards ("*")
      winner: true,
      winnerType: winnerType
    });
  }
  _onSpinComplete(position, val){
    this.setState((prevState) => {
      var arr = prevState.spinResults;
      arr[position] = val;
      return {
        spinResults: arr,
        spin: false
      };
    });
    if(position === 2){ //Only check when the last wheel is complete - to avoid false positives
      this._checkForWinner(this.state.spinResults);
    }
  }
  render() {
    const wheels = this._addWheels();
    let winnerBox;
    let shake = this.state.winner ? 'shake' : '';
    let slotsClasses = `${shake} slots`;
    if (this.state.winner) { //Show the winner message and background color changes on win
      winnerBox = <WinnerBox type={this.state.winnerType} />
      document.getElementsByTagName('body')[0].classList.add('winner');
    } else {
      document.getElementsByTagName('body')[0].classList.remove('winner');
    }
    return (
      <div >
        <div className={slotsClasses}>
          <div className="machine">
            <div className="arrow"></div>
            {wheels}
          </div>
          <Arm spinWheels={this._spinWheels.bind(this)}/>
        </div>
        {winnerBox}
      </div>
    );
  }
}

class Wheel extends React.Component {
  constructor() {
   super();
   this.state = {
     wheelIndex: 0,
     wheelArr: ["Coffee", "Tea", 'Espresso', "Tea", "Coffee", 'Espresso', "Coffee", "*", 'Espresso', "Tea"] //since real slot machines have 10 options I added "*" as a bonus item
   }
  }
  _addPanels(arr){ //Build the parts of the wheel by showing the next, current, and previous images
    var wheelIndex = this.state.wheelIndex;
    var wheelNum = this.props.reactKey;
    var current = arr[wheelIndex];
    var next = wheelIndex === (arr.length - 1) ? 0 : wheelIndex + 1;
    var previous = wheelIndex === 0 ? (arr.length - 1) :  wheelIndex - 1;
    var wheelSegment = function(string, id) {
      var imgName = string === "*" ? "star.png" : string.toLowerCase() + wheelNum + ".png"
      var imgUrl = `https://william.kamovit.ch/img/${imgName}`;
      return <div className='segment' key={id} ><img src={imgUrl} /></div>
    }
    return [wheelSegment(arr[next], 1), wheelSegment(current, 2), wheelSegment(arr[previous],3)]
  }
  _spin(){
    var wheelNum = this.props.reactKey;
    var wheelArr = this.state.wheelArr;
    var inc = this.state.wheelIndex;
    //In order to mimic an actual slot machine the wheels take different amounts of time
    var randInc = Math.floor(Math.random() * ( (wheelNum * 10) + 1)) + (wheelNum * 10);
    var self = this;
    var incrementWheel = function(){
      if (inc !== randInc) { //Keep iterating through the options array until we hit the random position
        if (self.state.wheelIndex === (wheelArr.length - 1) ) {
          self.setState({wheelIndex:0});
        } else {
          self.setState((prevState) => {
            return {wheelIndex: prevState.wheelIndex + 1};
          });
        }
        inc++;
        setTimeout(incrementWheel, 150);
      } else {
        self.props.complete(wheelNum - 1, wheelArr[self.state.wheelIndex]);
      }
    }
    incrementWheel();
  }
  componentWillReceiveProps(nextProps) { //Fire the wheel spin before render - otherwise we get into a render loop
   if(nextProps.spin) {this._spin()}
  }
  render() {
    const panels = this._addPanels(this.state.wheelArr);
    return (
      <div className="wheel">
        {panels}
      </div>
    );
  }
}

class Arm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pulled: false
    }
  }
  _handleClick(){
    this.setState({pulled: true}); //this allows the arm to animate on click
    this.props.spinWheels();
    setTimeout(
      (function(el) {
         return function() {
            el.setState({pulled: false});
        }
     })(this), 1000);
  }
  render() {
    let pulled = this.state.pulled ? 'pulled' : '';
    let classList = `${pulled} arm`;
    return (
    <div className={classList} onClick={this._handleClick.bind(this)} >
      <div className="circle"></div>
      <div className="stick"></div>
    </div>
    );
  }
}

class WinnerBox extends React.Component {
  _printWinMessage(type){
    var drinkType = type === "*" ? "your choice" : type;
    return `Congrats! You've won a cup of ${drinkType}!`
  }
  render() {
    return (
    <div className="winnerBox">{this._printWinMessage(this.props.type)}</div>
    );
  }
}


ReactDOM.render(
  <Machine />,
  document.getElementById('app')
);
