ReactVault will keep and share state between components. It is backed by
`window.localStorage` and is meant to be used with pure React.

To start using ReactVault first import it in your components

    import Vault from 'react-vault';

And initialize it with the method `load` in the component `constructor`

    constructor(props){
      super(props);
      Vault.load(this); //you should pass the context of the component
    }

ReactVault may co-exist with component states and optionally receives an initial
state as the second parameter of the `load` method;

    constructor(props){
      super(props);

      this.state = {
        foo: 'Some value'
      };

      Vault.load(this,{name: 'John Doe'}); //second parameter is optional
    }

The precedence of states are in order of importance:

    **ReactVault State** > **Local State** > **Global State**  

Be careful to pick unique names and handle state keys as more specific states
will always overwrite more generic states.

Now use ReactVault to set, get, check and clear state data. They will be kept
and shared by all components in your application.

    Vault.set('name','Firstname Lastname');
    Vault.set('age','30');
    Vault.get('name'); //returns Firstname Lastname
    Vault.has('name'); //returns true
    Vault.clear('name'); //Removes the 'name' key
    Vault.clear(); //Clear all data in ReactVault and in all component states
