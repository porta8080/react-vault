class ReactVault{
  constructor(){
    this.context = null;
    this.key = '_ReactVault';
    if(!window.localStorage[this.key]) this.setGlobal({});
  }

  load(context,initial_state){
    this.context = context;
    if(!initial_state || typeof initial_state !== 'object') initial_state = {};
    var obj = Object.assign(this.getGlobal(),this.context.state,initial_state);
    this.update(obj,false);
  }

  set(key,value){
    var obj = {};
    if(typeof key === 'object') obj = key;
    else obj[key] = value;
    obj = Object.assign(this.context.state,obj);
    this.update(obj);
  }

  get(key){
    if(key in this.context.state) return this.context.state[key];
  }

  has(key){
    return key in this.context.state;
  }

  update(obj,isMounted=true){
    if(isMounted) this.context.setState(obj);
    else this.context.state = obj;
    this.setGlobal(obj);
  }

  clear(key){
    if(!key) this.update({});
    else{
      if(this.has(key)){
        var obj = this.context.state;
        delete obj[key];
        this.update(obj);
      }
    }
  }

  setGlobal(obj){
    window.localStorage[this.key] = JSON.stringify(obj);
  }

  getGlobal(){
    try{
      return JSON.parse(window.localStorage[this.key]);
    }catch(e){
      this.setGlobal({});
      return {};
    }
  }
}

module.exports = new Vault();
