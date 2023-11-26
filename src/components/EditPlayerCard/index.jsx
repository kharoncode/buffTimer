import styles from './editPlayerCard.module.css';

function formatDate(time, id) {
   const critic = document.getElementById(`critic-${id}`).checked;
   const date = Date.now() + (critic ? time * 2 : time);
   return date;
}

function spellDate(spell, int, id) {
   const turn = 93600000;
   const hour = 86400000;
   switch (spell) {
      case 'benedictionDeKeldar':
         return formatDate(Math.floor((int / 12) * turn), id);
      case 'attaqueSacree':
         return formatDate(Math.floor((int / 2) * hour), id);
      case 'grandeBenedictionDeKeldar':
         return formatDate(Math.floor((int / 12) * turn), id);
      case 'lameDeJustice':
         return formatDate(Math.floor((int / 12) * turn), id);
      case 'transcendance':
         return formatDate(Math.floor((int / 1.25) * hour), id);
      case 'regenerationMineure':
         return formatDate(Math.floor((int / 12) * turn), id);
      case 'resistance':
         return formatDate(Math.floor((int / 20) * turn), id);
      case 'salutDuDivin':
         return formatDate(Math.floor((int / 12) * turn), id);
      case 'regeneration':
         return formatDate(Math.floor((int / 24) * turn), id);
      case 'capriceDuDestin':
         return formatDate(Math.floor((int / 48) * turn), id);
      case 'chatiment':
         return formatDate(Math.floor((int / 20) * turn), id);
      default:
         return Date.now();
   }
}

function postSpell(id, store) {
   const spell = document.getElementById(`spellList-${id}`).value;
   const int = document.getElementById(`int-${id}`).value;

   const time = spellDate(spell, int, id);
   store
      .edit('spell', {
         search: { id: `${id}`, spell: `${spell}` },
         set: { date: `${time}` },
      })
      .then((res) => {
         console.log(res);
      });
}

function postLife(id, store) {
   const life = document.getElementById(`life-${id}`).value;
   const maxLife = document.getElementById(`maxLife-${id}`).value;
   store
      .edit('spell', {
         search: { id: `${id}` },
         set: { currentLife: `${life}`, maxLife: `${maxLife}` },
      })
      .then((res) => {
         console.log(res);
      });
}

export default function EditPlayerCard({ id, life, store }) {
   return (
      <div className={styles.container}>
         <form
            className={styles.formLife}
            onSubmit={(e) => {
               e.preventDefault();
               postLife(id, store);
            }}
         >
            <label>PV</label>
            <input
               className={styles.inputLife}
               id={`life-${id}`}
               type="text"
               defaultValue={life.now}
            />
            <label>PV Max</label>
            <input
               className={styles.inputLife}
               id={`maxLife-${id}`}
               type="text"
               defaultValue={life.maxLife}
            />
            <input className={styles.button} type="submit" value="MaJ" />
         </form>
         <form
            className={styles.formSpell}
            onSubmit={(e) => {
               e.preventDefault();
               postSpell(id, store);
            }}
         >
            <select
               className={styles.select}
               name="spellsList"
               id={`spellList-${id}`}
            >
               <option value="benedictionDeKeldar">
                  Bénédiction de Keldar
               </option>
               <option value="attaqueSacree">Attaque Sacrée</option>
               <option value="grandeBenedictionDeKeldar">
                  Grd Bénédiction de Keldar
               </option>
               <option value="lameDeJustice">Lame de Justice</option>
               <option value="transcendance">Transcendance</option>
               <option value="regenerationMineure">Régénération Mineure</option>
               <option value="resistance">Résistance</option>
               <option value="salutDuDivin">Salut du Divin</option>
               <option value="regeneration">Régénération</option>
               <option value="capriceDuDestin">Caprice du Destin</option>
               <option value="chatiment">Chatiment</option>
            </select>
            <input
               className={styles.inputInt}
               type="text"
               placeholder="INT"
               id={`int-${id}`}
            />
            <div className={styles.critic}>
               <input type="checkbox" id={`critic-${id}`} />
               <label>Critique ?</label>
            </div>
            <input
               className={styles.button}
               type="submit"
               value="Ajouter un sort"
            />
         </form>
      </div>
   );
}
