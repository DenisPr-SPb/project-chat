"use strict";(self.webpackChunkchat=self.webpackChunkchat||[]).push([[409],{9409:function(e,a,s){s.r(a),s.d(a,{default:function(){return N}});var i=s(5671),_=s(3144),n=s(136),t=s(7277),r=s(2791),o=s(1290),l=s(1087),d={dialogs__wrapper:"Dialogs_dialogs__wrapper__A+Glt",dialog__info:"Dialogs_dialog__info__v4l7r",dialogs__items:"Dialogs_dialogs__items__OHWhN",dialog__msg:"Dialogs_dialog__msg__de5zF",msg__item:"Dialogs_msg__item__NSC5g",dialog__name:"Dialogs_dialog__name__4m8eu",active:"Dialogs_active__4MvPV",dialog__text__wrapper:"Dialogs_dialog__text__wrapper__Qwmph",dialog__text__area__wrapper:"Dialogs_dialog__text__area__wrapper__Ijm0U",new__dialog__btn__wrapper:"Dialogs_new__dialog__btn__wrapper__N1CH1"},g=s(184);function u(e){var a=e.name,s=e.pathId;return(0,g.jsx)("div",{className:d.dialog__name,children:(0,g.jsx)(l.OL,{to:"/dialogs/".concat(s),children:a})})}var c=s(7689),p=s(5705),m=s(316);function x(e){var a=e.props;return a.isAuth?(0,g.jsxs)("div",{className:d.dialogs__wrapper,children:[(0,g.jsxs)("div",{className:d.dialog__info,children:[(0,g.jsx)("div",{className:d.dialogs__items,children:a.dialogsPage.companions.map((function(e){return(0,g.jsx)(u,{name:e.name,pathId:e.id},e.id)}))}),(0,g.jsx)("div",{className:d.dialog__msg,children:a.dialogsPage.messages.map((function(e){return(0,g.jsx)("div",{className:d.msg__item,children:e.message},e.id)}))})]}),(0,g.jsx)("div",{className:d.dialog__text__wrapper,children:(0,g.jsx)(h,{sendMessage:a.sendMessage,updateNewMessageText:a.updateNewMessageText})})]}):(0,g.jsx)(c.Fg,{to:"/login"})}function h(e){var a=e.updateNewMessageText,s=e.sendMessage;return(0,g.jsx)(p.J9,{initialValues:{newMessageBody:""},onSubmit:function(e,i){var _=i.resetForm;!function(e){a(e)}(e.newMessageBody),s(),_({values:""})},children:function(){return(0,g.jsx)(p.l0,{children:(0,g.jsxs)("div",{className:d.dialog__text__area__wrapper,children:[(0,g.jsx)("div",{children:(0,g.jsx)(p.gN,{name:"newMessageBody",as:"textarea",placeholder:"enter text"})}),(0,g.jsx)("div",{className:d.new__dialog__btn__wrapper,children:(0,g.jsx)(m.Z,{logo:"Send",type:"submit"})})]})})}})}var f=s(9101),v=s(6473),w=s(7781),j=function(e){(0,n.Z)(s,e);var a=(0,t.Z)(s);function s(){return(0,i.Z)(this,s),a.apply(this,arguments)}return(0,_.Z)(s,[{key:"render",value:function(){return(0,g.jsx)(x,{props:this.props})}}]),s}(r.Component);var N=(0,w.qC)((0,f.$j)((function(e){return{dialogsPage:e.dialogPage}}),(function(e){return{updateNewMessageText:function(a){e((0,o.P5)(a))},sendMessage:function(){e((0,o.XE)())}}})),v.D)(j)},6473:function(e,a,s){s.d(a,{D:function(){return o}});var i=s(1413),_=(s(2791),s(7689)),n=s(9101),t=s(184),r=function(e){return{isAuth:e.auth.isAuth}};function o(e){return(0,n.$j)(r,{})((function(a){return a.isAuth?(0,t.jsx)(e,(0,i.Z)({},a)):(0,t.jsx)(_.Fg,{to:"/login"})}))}}}]);
//# sourceMappingURL=409.d1daf6f8.chunk.js.map