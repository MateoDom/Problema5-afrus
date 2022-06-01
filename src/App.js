import {useState} from 'react';
import styles from './App.module.css';
function App() {

  const [password, setPassword] = useState('');
  const onSubmit = (e) => {
    e.preventDefault();
    if (errors.length && errors.space && errors.UpperOrLowerCase && errors.minNumber && errors.numberZero && errors.consecutiveLetters && errors.consecutiveNumbers && errors.specialCharacters && errors.specialCharactersNotTogether && errors.specialCharactersRepeated) {
      alert('Password is valid');
      setPassword('');
      setErrors({});
    }
  };
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    e.preventDefault();
    validatePassword(e.target.value);
    setPassword(e.target.value);
    if(e.target.value.length === 0){
      setErrors({});
    }
  };
  const validatePassword = (password) => {
    let errors = { };
    // Validar que el password tenga 16 caracteres
    if (password.length < 16) errors.length = false
    else errors.length = true;
    
  
    // Debe tener letras minúsculas y mayúsculas.
    let lowerCase = false;
    let upperCase = false;
    password.split("").forEach((char) => {
      char.toLowerCase() === char ? (lowerCase = true) : (upperCase = true);
    });
    if (!lowerCase || !upperCase) errors.UpperOrLowerCase = false;
    else errors.UpperOrLowerCase = true;
  
    // No puede tener 2 letras iguales consecutivas.
    let repeated = false;
    password.split("").forEach((char, index) => {
      if (char === password[index + 1]) {
        repeated = true;
      }
    });
    if (repeated)   errors.consecutiveLetters = false;
    else errors.consecutiveLetters = true;
  
    // Debe tener al menos 4 números.
    let numbers = 0;
    password.split("").forEach((char) => {
      return char.toLowerCase() === char.toUpperCase() ? numbers++ : numbers;
    });
    if (numbers < 4)  errors.minNumber = false;
    else errors.minNumber = true;
  
    // No puede tener 2 números iguales consecutivos.
    let consecutiveNumbers = false;
    password.split("").forEach((char, index) => {
      if (char.toLowerCase() === char.toUpperCase()) {
        if (Number(password[index + 1]) === Number(char)) {
          consecutiveNumbers = true;
        }
      }
    });
    if (consecutiveNumbers) errors.consecutiveNumbers = false;
    else errors.consecutiveNumbers = true;
  
    // Debe tener al menos 2 caracteres especiales (!@#$%ˆ&*-_+=?) pero ninguno de ellos puede
    //repetirse en ninguna posición y además los caracteres no pueden estar juntos.
    const specialCharacters = [
      "!",
      "@",
      "#",
      "$",
      "%",
      "^",
      "&",
      "*",
      "-",
      "_",
      "+",
      "=",
      "?",
    ];
    let filterCharacters = [];
    let specialCharactersCount = 0;
    let specialCharactersRepeated = false;
    let specialCharactersNotTogether = false;
  
    password.split("").forEach((char, index) => {
      if (specialCharacters.includes(char)) {
        specialCharactersCount++;
        filterCharacters.push(char);
      }
      if (
        specialCharacters.includes(char) &&
        specialCharacters.includes(password[index + 1])
      ) {
        specialCharactersNotTogether = true;
      }
    });
  
    for (let i = 0; i < filterCharacters.length; i++) {
      var newArray = filterCharacters.filter(
        (char) => char === filterCharacters[i]
      );
      if (newArray.length > 1) {
        specialCharactersRepeated = true;
      }
    }
  
    if (specialCharactersCount < 2) errors.specialCharacters = false;
    else errors.specialCharacters = true;
    if (specialCharactersRepeated) errors.specialCharactersRepeated = false;
    else errors.specialCharactersRepeated = true;
    if (specialCharactersNotTogether) errors.specialCharactersNotTogether = false;
    else errors.specialCharactersNotTogether = true;
  
    // No se puede usar el número 0.
    if (password.includes("0")) errors.numberZero = false;
    else errors.numberZero = true;
  
    // No se puede colocar espacios.
    if (password.includes(" ")) errors.space = false;
    else errors.space = true;
  
    return setErrors(errors);
  };

  
  return (
    <>
      <div className={styles.container}>
        <h1>Problema 5</h1>
        <form className={styles.form_container}>
          <label className={styles.form_text}>Password</label>
          <input className={styles.form_input}type='password' placeholder='Ingrese la contraseña' name="password" value={password} onChange={(e)=> onChange(e)}/>
         <button  className={styles.form_button} type='submit' onClick={(e) => onSubmit(e)}>Enviar</button>
        </form>
        <div className={styles.error_container}>
          <p>Password must contain:</p>
          <ul className={styles.list_container}>
            <li className={`${errors.length? styles.correct : styles.incorrect }`}>Min 16 characters</li>
            <li className={`${errors.UpperOrLowerCase? styles.correct : styles.incorrect }`} >Upper and lower case </li>
            <li className={`${errors.minNumber? styles.correct : styles.incorrect }`}>At least 4 numbers</li>
            <li className={`${errors.consecutiveNumbers? styles.correct : styles.incorrect }`}>No consecutive same numbers</li>
            <li className={`${errors.consecutiveLetters? styles.correct : styles.incorrect }`}>No consecutive same letters</li>
            <li className={`${errors.specialCharacters? styles.correct : styles.incorrect }`}>At least two special characters</li>
            <li className={`${errors.specialCharactersNotTogether? styles.correct : styles.incorrect }`}>No special characters together</li>
            <li className={`${errors.specialCharactersRepeated? styles.correct : styles.incorrect }`}>No special characters repeated</li>
            <li className={`${errors.numberZero? styles.correct : styles.incorrect }`}>Number 0 not allowed</li>
            <li className={`${errors.space? styles.correct : styles.incorrect }`}>Spaces not allowed</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
