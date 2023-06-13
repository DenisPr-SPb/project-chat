"use strict";(self.webpackChunkchat=self.webpackChunkchat||[]).push([[445],{6473:function(e,o,s){s.d(o,{D:function(){return l}});var t=s(1413),r=(s(2791),s(7689)),a=s(9101),n=s(184),i=function(e){return{isAuth:e.auth.isAuth}};function l(e){return(0,a.$j)(i,{})((function(o){return o.isAuth?(0,n.jsx)(e,(0,t.Z)({},o)):(0,n.jsx)(r.Fg,{to:"/login"})}))}},9445:function(e,o,s){s.r(o),s.d(o,{default:function(){return y}});var t=s(1413),r=s(5671),a=s(3144),n=s(136),i=s(7277),l=s(2791),c=s(9101),p=s(9439),u=s(4),A=s(3164),d=s(184);function f(e){var o=e.props,s=(0,l.useState)(o.status),t=(0,p.Z)(s,2),r=t[0],a=t[1],n=(0,l.useState)(!1),i=(0,p.Z)(n,2),c=i[0],u=i[1];return(0,l.useEffect)((function(){a(o.status)}),[o.status]),(0,d.jsx)("div",{className:"profile__status__wrapper",children:(0,d.jsxs)("div",{className:"profile__status",style:{display:"flex"},children:[(0,d.jsx)("div",{children:"Status: "}),!c&&(0,d.jsx)("div",{onClick:function(){return u(!0)},className:"status__text",children:r||"----"}),c&&(0,d.jsx)("input",{onChange:function(e){a(e.currentTarget.value)},autoFocus:!0,onBlur:function(){u(!1),o.updateStatus(r)},className:"status__input",value:r})]})})}var j=s(316),h={info__description__container:"ProfileData_info__description__container__gi1Qq",info__name:"ProfileData_info__name__wojJH",info__about:"ProfileData_info__about__idj9T",job__wrapper:"ProfileData_job__wrapper__9pfB4",job__looking:"ProfileData_job__looking__Q0Ip6",contact__wrapper:"ProfileData_contact__wrapper__KqXFt",editor:"ProfileData_editor__fnQ4u",input:"ProfileData_input__Mplzj"};function x(e){var o=e.contactKey,s=e.contactValue;return(0,d.jsxs)("div",{children:[o,": ",s]})}function v(e){var o=e.profile,s=e.isOwner,t=e.goToEditMode;return(0,d.jsxs)("div",{className:h.info__description__container,children:[(0,d.jsxs)("div",{className:h.info__name,children:["Name: ",o.fullName]}),(0,d.jsxs)("div",{className:h.info__about,children:["About me: ",o.aboutMe]}),(0,d.jsxs)("div",{className:h.job__wrapper,children:[(0,d.jsxs)("div",{className:h.job__looking,children:["Looking for a job: ",o.lookingForAJob?"YES":"NO"]}),o.lookingForAJob&&(0,d.jsxs)("div",{className:h.job__looking,children:["My skills: ",o.lookingForAJobDescription]})]}),(0,d.jsxs)("div",{className:h.contact__wrapper,children:["Contacts: ",Object.keys(o.contacts).map((function(e){return(0,d.jsx)(x,{contactKey:e,contactValue:o.contacts[e]},e)}))]}),s&&(0,d.jsx)(j.Z,{logo:"edit",action:t})]})}var _=s(5705);function g(e){var o=e.profile,s=e.updateProfileData,t=e.savePhoto;var r=o;function a(e){r.lookingForAJob="true"!==e.target.value}return o.aboutMe?r.aboutMe=o.aboutMe:r.aboutMe="",(0,d.jsxs)("div",{className:"profile__form",children:[(0,d.jsx)(_.J9,{initialValues:r,onSubmit:function(e,o){var t=o.resetForm;!function(e){s(e)}(e),t({values:""})},children:function(){return(0,d.jsxs)(_.l0,{children:[(0,d.jsxs)("div",{className:"form__fields",children:[Object.keys(r).filter((function(e){return"lookingForAJob"!==e&&"lookingForAJobDescription"!==e&&"contacts"!==e&&"photos"!==e&&"userId"!==e})).map((function(e){return(0,d.jsxs)("div",{children:[(0,d.jsx)("span",{children:e})," ",(0,d.jsx)(_.gN,{className:"field",name:e,placeholder:e},e)]},e)})),(0,d.jsxs)("label",{children:["Looking for a job:",(0,d.jsx)(_.gN,{type:"checkbox",name:"lookingForAJob",onClick:a})]}),r.lookingForAJob&&(0,d.jsxs)("div",{children:[(0,d.jsx)("span",{children:"About my skills:"}),(0,d.jsx)(_.gN,{name:"lookingForAJobDescription",placeholder:"what about job?"})]}),(0,d.jsxs)("div",{className:"form__contacts",children:[(0,d.jsx)("span",{children:"CONTACTS:"}),Object.keys(r.contacts).map((function(e){return null===r.contacts[e]&&(r.contacts[e]=""),(0,d.jsxs)("div",{children:[(0,d.jsx)("span",{children:e},"span-".concat(e)),(0,d.jsx)(_.gN,{className:"field",name:"contacts.".concat(e),placeholder:e},e)]},"div-".concat(e))}))]})]}),(0,d.jsx)("div",{className:"",children:(0,d.jsx)(j.Z,{logo:"Send",type:"submit"})})]})}}),(0,d.jsxs)("div",{children:[(0,d.jsx)("label",{children:" Change avatar:"}),(0,d.jsx)("input",{className:h.input,type:"file",onChange:function(e){e.target.files.length&&t(e.target.files[0])}})]})]})}var m={info__wrapper:"ProfileInfo_info__wrapper__KP3ip",avatar__container:"ProfileInfo_avatar__container__Mt2yk",description__container:"ProfileInfo_description__container__ZYUXG",info__avatar:"ProfileInfo_info__avatar__XWn1K"};function P(e){var o=e.props,s=e.isOwner,t=e.savePhoto,r=e.saveProfileData,a=(0,l.useState)(!1),n=(0,p.Z)(a,2),i=n[0],c=n[1];if(!o.profile)return(0,d.jsx)(u.Z,{});return(0,d.jsxs)("div",{className:m.info__wrapper,children:[(0,d.jsx)("div",{className:m.avatar__container,children:(0,d.jsx)("div",{className:m.info__avatar,children:(0,d.jsx)("img",{src:o.profile.photos.small?o.profile.photos.small:A,alt:""})})}),(0,d.jsxs)("div",{className:m.description__container,children:[(0,d.jsx)(f,{props:o}),i?(0,d.jsx)(g,{profile:o.profile,updateProfileData:function(e){r(e),c(!1)},savePhoto:t}):(0,d.jsx)(v,{profile:o.profile,isOwner:s,goToEditMode:function(){c(!0)}})]})]})}var N=s(962);function k(e){var o=e.post,s=e.like;return(0,d.jsxs)("div",{className:"post__item__wrapper",children:[(0,d.jsx)("div",{className:"post__avatar"}),(0,d.jsx)("div",{className:"post__text",children:o}),(0,d.jsx)("div",{className:"post__setup",children:(0,d.jsxs)("div",{className:"post__likes",children:["Likes: ",s]})})]})}function J(e){var o=e.props;return(0,d.jsxs)("div",{className:"posts__wrapper",children:[(0,d.jsx)("div",{children:(0,d.jsx)("h3",{children:"My post"})}),(0,d.jsxs)("div",{className:"post__wrapper",children:[(0,d.jsx)("div",{className:"new__post__wrapper",children:(0,d.jsx)(w,{updateNewPostText:o.updateNewPostText,addPost:o.addPost})}),(0,d.jsx)("div",{children:o.postsData.map((function(e){return(0,d.jsx)(k,{post:e.post,like:e.likes,id:e.id},e.id)}))})]})]})}function w(e){var o=e.updateNewPostText,s=e.addPost;return(0,d.jsx)(_.J9,{initialValues:{newPostBody:""},onSubmit:function(e,t){var r=t.resetForm;!function(e){o(e),s()}(e.newPostBody),r({values:""})},children:function(){return(0,d.jsxs)(_.l0,{children:[(0,d.jsx)("div",{className:"",children:(0,d.jsx)(_.gN,{name:"newPostBody",as:"textarea",placeholder:"enter text"})}),(0,d.jsx)("div",{className:"",children:(0,d.jsx)(j.Z,{logo:"Send",type:"submit"})})]})}})}function b(e){return(0,d.jsx)(J,{props:e})}var B=(0,c.$j)((function(e){return{newPostText:e.profilePage.newPostText,postsData:e.profilePage.posts}}),(function(e){return{updateNewPostText:function(o){e((0,N._M)(o))},addPost:function(){e((0,N.Wl)())}}}))(l.memo(b)),Q="Profile_profile__wrapper__A2QPH";function E(e){var o=e.props,s=e.isOwner,t=e.savePhoto,r=e.saveProfileData;return(0,d.jsxs)("div",{className:Q,children:[(0,d.jsx)(P,{props:o,isOwner:s,savePhoto:t,saveProfileData:r}),(0,d.jsx)(B,{})]})}var C=s(7689),R=s(6473),I=s(7781),M=function(e){(0,n.Z)(s,e);var o=(0,i.Z)(s);function s(){return(0,r.Z)(this,s),o.apply(this,arguments)}return(0,a.Z)(s,[{key:"profileRefresh",value:function(){var e=this.props.router.params.userId;e||(e=this.props.loggedUserId.toString()),this.props.getUserProfile(e),this.props.getStatus(e)}},{key:"componentDidMount",value:function(){this.profileRefresh()}},{key:"componentDidUpdate",value:function(e,o,s){this.props.router.params.userId!==e.router.params.userId&&this.profileRefresh()}},{key:"render",value:function(){return(0,d.jsx)(E,{isOwner:!this.props.router.params.userId,props:this.props,savePhoto:this.props.savePhoto,saveProfileData:this.props.saveProfileData})}}]),s}(l.Component);var y=(0,I.qC)((0,c.$j)((function(e){return{profile:e.profilePage.profile,status:e.profilePage.status,loggedUserId:e.auth.userId}}),{getUserProfile:N.et,getStatus:N.lR,updateStatus:N.Nf,savePhoto:N.Ju,saveProfileData:N.xU}),(function(e){return function(o){var s=(0,C.TH)(),r=(0,C.s0)(),a=(0,C.UO)();return(0,d.jsx)(e,(0,t.Z)((0,t.Z)({},o),{},{router:{location:s,navigate:r,params:a}}))}}),R.D)(M)},3164:function(e){e.exports="data:image/jpeg;base64,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"}}]);
//# sourceMappingURL=445.014447af.chunk.js.map