import { Navigate, useParams } from 'react-router-dom';
import { type FormEvent } from 'react';
import styles from './player.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
   getUserIntelligence,
   getPlayersList,
   getDataSpellsStore,
} from '@/router/selectors';
import { useState } from 'react';
import { AppDispatch, store } from '@/router/store';
import { uptadePlayersBuff } from '@/pages/players/playersSlice';
import getUserSpellsList from '@/utils/getUserSpellsList';

type submitData = { critic: boolean; int: number; spell: string };

type spellType = { type: string };

function spellDate(data: submitData) {
   const { int, critic, spell } = data;
   const time = Math.floor(getDataSpellsStore(store)[spell].time * int);
   const date = Date.now() + (critic ? time * 1.5 : time);
   return date;
}

const SpellSelect = (data: spellType) => {
   const spheres = getUserSpellsList();
   const { type } = data;
   return (
      <select
         className={styles.select}
         name={`spellsList${type}`}
         id={`spellList${type}`}
      >
         {Object.keys(spheres)
            .sort()
            .map((key) => (
               <option key={key} value={key}>
                  {spheres[key].name}
               </option>
            ))}
      </select>
   );
};

const Player = () => {
   const { playerId } = useParams();
   const players = useSelector(getPlayersList);
   const player = players[playerId];
   if (player === undefined) {
      return <Navigate to="/players" />;
   }

   const dispatch = useDispatch<AppDispatch>();
   const [isLoading, setLoading] = useState(false);
   const [choice, setChoice] = useState('Default');
   const intelligence = useSelector(getUserIntelligence);

   const handleSubmitNew = (e: FormEvent<HTMLFormElement>, id: string) => {
      e.preventDefault();
      setLoading(true);
      const spell = e.currentTarget.spellListNew.value;
      const submitData = {
         spell: spell,
         int: intelligence,
         critic: e.currentTarget.critic.checked,
      };
      const result = {
         id: id,
         spell: spell,
         date: spellDate(submitData),
      };
      dispatch(uptadePlayersBuff(result)).then(() => setLoading(false));
   };

   const handleSubmitOld = (e: FormEvent<HTMLFormElement>, id: string) => {
      e.preventDefault();
      setLoading(true);
      const spell = e.currentTarget.spellListOld.value;
      const day = parseInt(e.currentTarget.day.value) * 86400000;
      const houre = parseInt(e.currentTarget.hour.value) * 3600000;
      const minute = parseInt(e.currentTarget.minute.value) * 60000;
      const result = {
         id: id,
         spell: spell,
         date: day + houre + minute + Date.now(),
      };
      dispatch(uptadePlayersBuff(result)).then(() => setLoading(false));
   };

   return (
      <div className={styles.container}>
         <h3>Editer : {player.name}</h3>
         <select
            className={styles.select}
            name="choice"
            id={`choice`}
            onChange={(e) => {
               setChoice(e.target.value);
            }}
         >
            <option value="Default">Vous souhaitez :</option>
            <option value="New">Ajouter un nouveau sort</option>
            <option value="Old">Ajouter un sort en cours</option>
         </select>
         {choice === 'New' ? (
            <form
               className={styles.form}
               onSubmit={(e) => {
                  handleSubmitNew(e, player.id);
               }}
            >
               <SpellSelect type={choice} />
               <div className={styles.inputCritic}>
                  <label htmlFor={`critic`}>Réussite Critique ?</label>
                  <input type="checkbox" id={`critic`} />
               </div>
               <button type="submit" className={styles.button}>
                  {isLoading ? 'Loading ...' : 'Ajouter un sort'}
               </button>
            </form>
         ) : choice === 'Old' ? (
            <form
               className={styles.form}
               onSubmit={(e) => {
                  handleSubmitOld(e, player.id);
               }}
            >
               <SpellSelect type={choice} />
               <div className={styles.inputLabel}>
                  Entrez la durée:
                  <label htmlFor={`day`}>Jour</label>
                  <input
                     className={styles.inputText}
                     type="text"
                     id={`day`}
                     required
                     defaultValue={0}
                  />
                  <label htmlFor={`hour`}>Heure</label>
                  <input
                     className={styles.inputText}
                     type="text"
                     id={`hour`}
                     required
                     defaultValue={0}
                  />
                  <label htmlFor={`minute`}>Minute</label>
                  <input
                     className={styles.inputText}
                     type="text"
                     id={`minute`}
                     required
                     defaultValue={1}
                  />
               </div>
               <button type="submit" className={styles.button}>
                  {isLoading ? 'Loading ...' : 'Ajouter un sort'}
               </button>
            </form>
         ) : (
            <></>
         )}
      </div>
   );
};

export default Player;
