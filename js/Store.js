class Store {
  /**
   * @param {!string} name Database name
   * @param {function()} [callback] Called when the Store is ready
   */
  constructor(name, callback) {
    /**
     * @type {Storage}
     */
    const localStorage = window.localStorage;

    /**
     * @type {ItemList}
     */
    let gameData;

    /**
     * Read the local ItemList from localStorage.
     *
     * @returns {ItemList} Current array of todos
     */
    this.getLocalStorage = () => {
      return gameData || JSON.parse(localStorage.getItem(name) || '[]');
    };

    /**
     * Write the local ItemList to localStorage.
     *
     * @param {ItemList} todos Array of todos to write
     */
    this.setLocalStorage = (data) => {
      localStorage.setItem(name, JSON.stringify((gameData = data)));
    };

    if (callback) {
      callback();
    }
  }

  /**
   * Find items with properties matching those on query.
   *
   * @param {ItemQuery} query Query to match
   * @param {function(ItemList)} callback Called when the query is done
   *
   * @example
   * db.find({completed: true}, data => {
   *	 // data shall contain items whose completed properties are true
   * })
   */
  find(query, callback) {
    const gameData = this.getLocalStorage();
    let k;

    callback(
      gameData.filter((data) => {
        for (k in query) {
          if (query[k] !== data[k]) {
            return false;
          }
        }
        return true;
      }),
    );
  }

  /**
   * Update an item in the Store.
   *
   * @param {ItemUpdate} update Record with an id and a property to update
   * @param {function()} [callback] Called when partialRecord is applied
   */
  update(update, callback) {
    const id = update.id;
    const gameData = this.getLocalStorage();
    let i = gameData.length;
    let k;

    while (i--) {
      if (gameData[i].id === id) {
        for (k in update) {
          todos[i][k] = update[k];
        }
        break;
      }
    }

    this.setLocalStorage(gameData);

    if (callback) {
      callback();
    }
  }

  /**
   * Insert an item into the Store.
   *
   * @param {Item} item Item to insert
   * @param {function()} [callback] Called when item is inserted
   */
  insert(item, callback) {
    const gameData = this.getLocalStorage();
    gameData.push(item);
    this.setLocalStorage(gameData);

    if (callback) {
      callback();
    }
  }

  /**
   * Remove items from the Store based on a query.
   *
   * @param {ItemQuery} query Query matching the items to remove
   * @param {function(ItemList)|function()} [callback] Called when records matching query are removed
   */
  remove(query, callback) {
    let k;

    const gameData = this.getLocalStorage().filter((data) => {
      for (k in query) {
        if (query[k] !== data[k]) {
          return true;
        }
      }
      return false;
    });

    this.setLocalStorage(gameData);

    if (callback) {
      callback(gameData);
    }
  }
}
