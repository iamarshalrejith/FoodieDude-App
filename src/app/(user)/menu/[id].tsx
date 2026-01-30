import { View, Text,Image, StyleSheet,Pressable } from "react-native";
import React from "react";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import products from "@/assets/data/products"
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import {useState} from "react"
import Button from "@/src/components/Button"
import { useCart } from "@/src/providers/CartProvider";
import { PizzaSize } from "@/src/types";

const sizes:PizzaSize[] = ['S','M','L','XL']

const ProductDetailsScreen = () => {
  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');
  const { id } = useLocalSearchParams();
  const {addItem} = useCart();
  const router = useRouter();

  const product = products.find((p) => p.id.toString() === id)

  const addToCart = () => {
    if(!product){return}
    addItem(product,selectedSize);
    router.push('/cart')
  }

  if(!product){
    return <Text>Product not found</Text>
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name}} />
      <Image source={{uri:product.image || defaultPizzaImage}}
      style={styles.image}/>
      <Text>Select Size</Text>
      <View style={styles.sizes}>
        {
        sizes.map((size)=> {
          return(
            <Pressable key={size}
            onPress={() => setSelectedSize(size)}
            style={[styles.size,{
              backgroundColor: selectedSize === size ? 'gainsboro' : 'white',
            }]}>
                   <Text style={[styles.sizeText,{
                    color : selectedSize === size ? 'black' : 'gray'
                   }]} >{size}</Text>
            </Pressable>
       
          )
        })
      }
      </View>
      

      <Text style={styles.price}>${product.price}</Text>
      <View style = {styles.cartBtn}>
         <Button onPress={addToCart} text={"Add to Cart"} />
      </View>
    </View>
  );
};


export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding:10,
  },
  image: {
    width: '100%',
    aspectRatio: 1
  },
  price: {
     fontSize: 18,
     fontWeight: "bold",
     marginVertical: 10,
     marginLeft: 10,
     backgroundColor: '#b8d332',
     borderRadius: 5,
     padding: 8,
     maxWidth: 100,
     textAlign: 'center',
     width:"100%"
  },
  sizes:{
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  size:{
    backgroundColor: "gainsboro",
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center"
  },
  sizeText: {
    fontSize:20,
    fontWeight: "500"
  },
  cartBtn: {
    marginTop: 50,
  }
})
