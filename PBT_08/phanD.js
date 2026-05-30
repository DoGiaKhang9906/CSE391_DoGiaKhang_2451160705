function createCart() {
    let items =[];
    return {
        addItem(name, price) {
            items.push({name, price});
        },

        removeItem(name) {
            items = items.filter((item) => item.name !== name);
        },

        getTotal() {
            return items.reduce((sum, i) => sum + i.price, 0);
        },

        printCart() {
            if(items.length == 0) {
                console.log("Gio hang trong!");
                return;
            }
            items.forEach((item) => {
                console.log(`${item.name}: $${item.price}`);
            });
            console.log(`Tong tien: $${this.getTotal()}`);
        }
    }
}

const myCart = createCart();
myCart.addItem("Ao", 100);
myCart.addItem("Quan", 200);
myCart.addItem("Giay", 150);
myCart.printCart();
myCart.removeItem("Quan");
console.log("Sau khi xoa:");
myCart.printCart();