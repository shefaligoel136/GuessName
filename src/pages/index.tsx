import { useState, FormEvent } from 'react';
import { getAge, getGender, getCountry, getCount } from '../utils/api';
import styles from '../utils/styles/search.module.css';

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number | undefined>(undefined);
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [countries, setCountries] = useState<{ country_id: string; probability: number }[]>([]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const count = await getCount(name);
      setCount(count);
      if (count > 0) {
        const age = await getAge(name);
        const gender = await getGender(name);
        const countriesData = await getCountry(name);
        setAge(age);
        setGender(gender);
        setCountries(countriesData);
      } else {
        setAge('');
        setGender('');
        setCountries([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Guess Age, Gender, and Country</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className={styles.buttonContainer}>
          <button type="submit">Guess</button>
        </div>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : count === undefined ? (
        <></>
      ) : count > 0 ? (
        <div className={styles.resultContainer}>
          {age && <p className={styles.result}>Guessed Age: {age}</p>}
          {gender && (
            <p className={styles.result}>
              Guessed Gender: {gender.charAt(0).toUpperCase() + gender.substring(1)}
            </p>
          )}
          {countries.length > 0 ? (
            <div className={styles.tableContainer}>
              <p className={styles.result}>Guessed Countries:</p>
              <table>
                <thead>
                  <tr>
                    <th>Country</th>
                    <th>Probability</th>
                  </tr>
                </thead>
                <tbody>
                  {countries.map((country) => (
                    <tr key={country.country_id}>
                      <td>{country.country_id}</td>
                      <td>{country.probability}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No Records</p>
          )}
        </div>
      ) : (
        <><p>No Records</p></>
      )}
    </div>
  );
}
