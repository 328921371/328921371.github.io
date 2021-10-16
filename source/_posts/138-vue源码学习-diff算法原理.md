---
title: vue源码学习-diff算法原理
categories:
  - Vue
tags:
  - Vue
copyright: true
comments: true
abbrlink: 3284c2b9
date: 2021-02-11 11:33:00
---

<hr style='filter:progid:DXImageTransform.Microsoft.Glow(color=#FF0000,strength=10)' color='#FF0000' size='1' />

> 今天就是除夕了,也只有放假才有时间写一写博客,把欠下的博客都补上

<!--more-->

diff算法是我们在学习vue时经常听到的,像什么vue异步更新DOM,虚拟DOM的变化,都和diff算法有关,那什么是diff算法,他的作用又是什么呢

### diff算法的时间复杂度 

 两个树的完全的 diff 算法是一个时间复杂度为 O(n3) , Vue 进行了优化·O(n3) 复杂度的问题转换成 O(n) 复杂度的问题(只比较同级不考虑跨级问题)  在前端当中， 你很少会跨越层级地移动Dom元素。 所 以 Virtual Dom只会对同一个层级的元素进行对比。
 
### diff算法原理

> 简单的来说,diff算法是为了比较新的DOM树和旧的DOM树,以此来算出,哪些DOM可以复用,新增哪些DOM,移除哪些DOM,优化DOM树的渲染

自己总结的原理大概是这样的: 

1. 目的: 比较 `新的树` 和 `旧的树`

> 在新的树和旧的树头部插入指针, 尾部也插入指针, 进行双指针循环遍历比较

2. 如何进行比较: 

假设,旧的DOM树和新的DOM树开头相同,指针从开头比较(针对元素新增在末尾,前面相同的DOM元素可以复用)
如果开头不一样的话,指针从尾部开始比较(针对元素新增在开头,后面相同的DOM元素可以复用)
如果尾部也不一样,会比较新的头和旧的尾(针对末尾的DOM元素移动到了开头)
要是也不一样,比较新的尾和旧的头(针对开始的DOM元素移动到了末尾)
都不一样,从开头开始遍历(从头开始遍历父级节点和子级节点)

详细的图片在底下,可以比较图片进行理解

3. 如何循环遍历: 

首先同级比较, 在比较子节点

> 同级比较: 也就是父节点和父节点比较,子节点和子节点比较

如果父级节点相同,再比较子节点

比较的时候,是这样判断的: 

* 新的有,旧的也有,使用旧的
* 新的有,旧的没有,插入新的
* 新的没有,旧的有,删除旧的
* 当比较父级的时候,判断子节点是否存在也是这样判断的,都存在的情况下,进行深入递归遍历


![示例图片](https://csblogimage.oss-cn-hangzhou.aliyuncs.com/138-diff.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,size_16,text_Qnku6ZmI5YWI55Sf55qE5bCP5YmN56uv,color_FFFFFF,shadow_50,t_100,g_se,x_10,y_10)

看看图片中的最后一条

假设 旧的数据为 ABCD , 新的数据为 CDME

由于都不满足比较的四点基本判断,所以直接从开头开始遍历

1. 首先判断新的DOM树的第一个'C',发现旧的有,移动到第一个
2. 然后判断新的DOM树的第二个'D',发现旧的有,移动到第二个
3. 再判断'M'和'E',发现都没有,直接插入
4. 最后将AB直接删除

> 这就是为什么v-for要用Key,不加的话会使用上面的diff算法进行暴力比对

知道了大致的流程,我们再去源码中看看具体的代码是怎么实现的(源码的位置在core/vdom/patch.js中)

```
const oldCh = oldVnode.children // 老的儿子 
const ch = vnode.children // 新的儿子 
if (isUndef(vnode.text)) {
  if (isDef(oldCh) && isDef(ch)) { // 比较孩子        
    if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly)
  } else if (isDef(ch)) { // 新的儿子有 老的没有        
    if (isDef(oldVnode.text)) {
      nodeOps.setTextContent(elm, '') // 将老的清空   
      addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue)
    }   
  } else if (isDef(oldCh)) { // 如果老的有新的没有 就删除        
    removeVnodes(oldCh, 0, oldCh.length - 1)
  } else if (isDef(oldVnode.text)) { // 老的有文本 新的没文本
    nodeOps.setTextContent(elm, '') // 将老的清空    
  }
} else if (oldVnode.text !== vnode.text) { // 文本不相同替换   
  nodeOps.setTextContent(elm, vnode.text)
}

function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
  let oldStartIdx = 0
  let newStartIdx = 0
  let oldEndIdx = oldCh.length - 1
  let oldStartVnode = oldCh[0]
  let oldEndVnode = oldCh[oldEndIdx]
  let newEndIdx = newCh.length - 1
  let newStartVnode = newCh[0]
  let newEndVnode = newCh[newEndIdx]
  let oldKeyToIdx, idxInOld, vnodeToMove, refElm
  // removeOnly is a special flag used only by <transition-group>    
  // to ensure removed elements stay in correct relative positions    
  // during leaving transitions    
  const canMove = !removeOnly
  if (process.env.NODE_ENV !== 'production') {
    checkDuplicateKeys(newCh)
  }
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (isUndef(oldStartVnode)) {
      oldStartVnode = oldCh[++oldStartIdx] // Vnode has been moved left     
    } else if (isUndef(oldEndVnode)) {
      oldEndVnode = oldCh[--oldEndIdx]
    } else if (sameVnode(oldStartVnode, newStartVnode)) {
      patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx) oldStartVnode = oldCh[++
        oldStartIdx] newStartVnode = newCh[++newStartIdx]
    } else if (sameVnode(oldEndVnode, newEndVnode)) {
      patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx) oldEndVnode = oldCh[--oldEndIdx] newEndVnode =
        newCh[--newEndIdx]
    } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right        
      patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx) canMove && nodeOps.insertBefore(
          parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm)) oldStartVnode = oldCh[++oldStartIdx] newEndVnode =
        newCh[--newEndIdx]
    } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left        
      patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx) canMove && nodeOps.insertBefore(
        parentElm, oldEndVnode.elm, oldStartVnode.elm) oldEndVnode = oldCh[--oldEndIdx] newStartVnode = newCh[++
        newStartIdx]
    } else {


      if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx) idxInOld = isDef(
        newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : findIdxInOld(newStartVnode, oldCh, oldStartIdx,
        oldEndIdx) if (isUndef(idxInOld)) { // New element          
        createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
      } else {
        vnodeToMove = oldCh[idxInOld]
        if (sameVnode(vnodeToMove, newStartVnode)) {
          patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx) oldCh[idxInOld] = undefined canMove &&
            nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm)
        } else { // same key but different element. treat as new element           
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
        }
      } newStartVnode = newCh[++newStartIdx]
    }
  }
  if (oldStartIdx > oldEndIdx) {
    refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm addVnodes(parentElm, refElm, newCh,
      newStartIdx, newEndIdx, insertedVnodeQueue)
  }
  a
  else if (newStartIdx > newEndIdx) {
    removeVnodes(oldCh, oldStartIdx, oldEndIdx)
  }
}

```

以上就是我对diff算法的一些理解,如果文章由于我学识浅薄,导致您发现有严重谬误的地方,请一定在评论中指出,我会在第一时间修正我的博文,以避免误人子弟。











